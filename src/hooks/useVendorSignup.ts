import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useVendorSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      shopName,
      pavilion,
      room,
      phone,
      description,
    }: {
      userId: string;
      shopName: string;
      pavilion: string;
      room: string;
      phone: string;
      description?: string;
    }) => {
      // Create vendor profile
      const { data: vendorProfile, error: vendorError } = await supabase
        .from('vendor_profiles')
        .insert({
          user_id: userId,
          shop_name: shopName,
          pavilion,
          room,
          phone,
          description,
        })
        .select()
        .single();

      if (vendorError) throw vendorError;

      // Add vendor role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'vendor',
        });

      if (roleError) throw roleError;

      return vendorProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
      toast.success('Compte vendeur créé avec succès ! Premier mois gratuit.');
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la création du compte vendeur');
      console.error(error);
    },
  });
};
