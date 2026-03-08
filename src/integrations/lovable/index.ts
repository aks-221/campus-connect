import { supabase } from "../supabase/client";

export const lovable = {
  auth: {
    signInWithOAuth: async (provider: "google" | "apple", opts?: { redirect_uri?: string }) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: opts?.redirect_uri || window.location.origin,
        },
      });
      return { error };
    },
  },
};
