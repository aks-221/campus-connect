import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const VAPID_PUBLIC_KEY = 'BC8d3OFkpNFGPBwMJ0ijfHLi4dhZ0EK7G5G98-wglJJT0929mZsM2ke6CxJQ-luTX7bgMuhDJyRdG9_kQjzclIw';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerPushSubscription(userId: string) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return;
  }

  try {
    // Don't register SW in iframes or preview hosts
    const isInIframe = (() => { try { return window.self !== window.top; } catch { return true; } })();
    const isPreviewHost = window.location.hostname.includes('id-preview--') || window.location.hostname.includes('lovableproject.com');
    if (isInIframe || isPreviewHost) {
      console.log('Skipping push registration in preview/iframe');
      return;
    }

    const registration = await navigator.serviceWorker.register('/sw-push.js');
    await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisuallyRequired: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    } as any);

    const subJson = subscription.toJSON();
    
    // Save to database
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: userId,
        endpoint: subJson.endpoint!,
        p256dh: subJson.keys!.p256dh!,
        auth: subJson.keys!.auth!,
      }, { onConflict: 'user_id,endpoint' });

    if (error) {
      console.error('Failed to save push subscription:', error);
    } else {
      console.log('Push subscription registered successfully');
    }
  } catch (error) {
    console.error('Push registration failed:', error);
  }
}

export const useVendorNotifications = () => {
  const { user, isVendor, vendorProfile } = useAuth();
  const queryClient = useQueryClient();
  const notifiedOrderIds = useRef<Set<string>>(new Set());
  const navigate = useNavigate();
  const pushRegistered = useRef(false);

  // Register push subscription for vendors
  useEffect(() => {
    if (isVendor && user && !pushRegistered.current) {
      pushRegistered.current = true;
      registerPushSubscription(user.id);
    }
  }, [isVendor, user]);

  // Send push notification via edge function
  const sendPushNotification = useCallback(async (vendorId: string, orderId: string) => {
    try {
      await supabase.functions.invoke('send-push-notification', {
        body: {
          vendor_id: vendorId,
          title: '🔔 Nouvelle commande !',
          body: 'Consultez vos commandes et marquez-la comme terminée après retrait du client.',
          url: '/vendeur',
          tag: `order-${orderId}`,
        },
      });
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  }, []);

  useEffect(() => {
    if (!user || !isVendor || !vendorProfile) return;

    const channel = supabase
      .channel(`vendor-orders-${vendorProfile.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `vendor_id=eq.${vendorProfile.id}`,
        },
        (payload) => {
          const newOrder = payload.new as { id: string; total_amount: number };

          if (notifiedOrderIds.current.has(newOrder.id)) return;
          notifiedOrderIds.current.add(newOrder.id);

          queryClient.invalidateQueries({ queryKey: ['vendor-orders'] });

          // Play notification sound
          try {
            const audio = new Audio('/notification.wav');
            audio.volume = 0.7;
            audio.play().catch(() => {});
          } catch {}

          // In-app toast
          toast('🔔 Nouvelle commande !', {
            description: 'Consultez vos commandes et marquez-la comme terminée après retrait du client.',
            duration: 8000,
            action: {
              label: 'Voir',
              onClick: () => navigate('/vendeur'),
            },
          });

          // Send Web Push (for when app is closed/background)
          sendPushNotification(vendorProfile.id, newOrder.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isVendor, vendorProfile, queryClient, navigate, sendPushNotification]);
};
