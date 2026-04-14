import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useVendorNotifications = () => {
  const { user, isVendor, vendorProfile } = useAuth();
  const queryClient = useQueryClient();
  const notifiedOrderIds = useRef<Set<string>>(new Set());
  const navigate = useNavigate();

  // Request browser notification permission
  useEffect(() => {
    if (isVendor && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [isVendor]);

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

          // Avoid duplicates
          if (notifiedOrderIds.current.has(newOrder.id)) return;
          notifiedOrderIds.current.add(newOrder.id);

          // Invalidate orders query to refresh data
          queryClient.invalidateQueries({ queryKey: ['vendor-orders'] });

          // In-app toast notification
          toast('🔔 Nouvelle commande !', {
            description: 'Consultez vos commandes et marquez-la comme terminée après retrait du client.',
            duration: 8000,
            action: {
              label: 'Voir',
              onClick: () => navigate('/vendeur'),
            },
          });

          // Browser push notification
          if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification('🔔 Nouvelle commande !', {
              body: 'Consultez vos commandes et marquez-la comme terminée après retrait du client.',
              icon: '/pwa-icon.png',
              tag: `order-${newOrder.id}`,
            });

            notification.onclick = () => {
              window.focus();
              navigate('/vendeur');
              notification.close();
            };
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isVendor, vendorProfile, queryClient, navigate]);
};
