import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileEditFormProps {
  vendorProfile: any;
}

export const ProfileEditForm = ({ vendorProfile }: ProfileEditFormProps) => {
  const { refreshProfile } = useAuth();
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    shop_name: vendorProfile?.shop_name || "",
    phone: vendorProfile?.phone || "",
    pavilion: vendorProfile?.pavilion || "",
    room: vendorProfile?.room || "",
  });

  const handleSave = async (field: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('vendor_profiles')
        .update({ [field]: values[field as keyof typeof values] })
        .eq('id', vendorProfile.id);

      if (error) throw error;

      await refreshProfile();
      toast.success("Informations mises à jour !");
      setEditing(null);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (field: string) => {
    setValues(prev => ({
      ...prev,
      [field]: vendorProfile?.[field] || "",
    }));
    setEditing(null);
  };

  const fields = [
    { key: "shop_name", label: "Nom de la boutique", type: "text" },
    { key: "phone", label: "Téléphone", type: "tel" },
    { key: "pavilion", label: "Bâtiment", type: "text" },
    { key: "room", label: "Chambre", type: "text" },
  ];

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {field.label}
          </label>
          <div className="flex gap-2 items-center">
            <input
              type={field.type}
              value={values[field.key as keyof typeof values]}
              onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
              readOnly={editing !== field.key}
              className={`flex-1 h-12 px-4 rounded-xl border-0 text-foreground transition-colors ${
                editing === field.key
                  ? "bg-background ring-2 ring-primary/20 focus:outline-none"
                  : "bg-secondary"
              }`}
            />
            
            {editing === field.key ? (
              <div className="flex gap-1 shrink-0">
                <Button
                  size="icon"
                  className="h-12 w-12 shrink-0"
                  onClick={() => handleSave(field.key)}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 shrink-0"
                  onClick={() => handleCancel(field.key)}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                className="h-12 w-12 shrink-0"
                onClick={() => setEditing(field.key)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};