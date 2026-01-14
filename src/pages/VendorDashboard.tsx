import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Home,
  Settings,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import uamLogo from "@/assets/uam-logo.png";
import { mockProducts, mockOrders } from "@/data/mockData";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState<"produits" | "commandes" | "profil">("produits");
  
  const vendorProducts = mockProducts.filter((p) => p.vendeurId === "v1");
  const vendorOrders = mockOrders.filter((o) => o.vendeurId === "v1");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={uamLogo} alt="UAM" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-primary font-display">
                UAM Commerce
              </span>
              <p className="text-[10px] text-muted-foreground -mt-1">
                Espace Vendeur
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Subscription Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-xs font-medium">Abonnement actif</span>
            </div>
            
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Boutique</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Bonjour, Fatou ! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos produits et commandes depuis votre espace vendeur.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card">
            <Package className="h-6 w-6 text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{vendorProducts.length}</p>
            <p className="text-sm text-muted-foreground">Produits</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card">
            <ShoppingCart className="h-6 w-6 text-accent mb-2" />
            <p className="text-2xl font-bold text-foreground">{vendorOrders.length}</p>
            <p className="text-sm text-muted-foreground">Commandes</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card">
            <Eye className="h-6 w-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {vendorProducts.filter((p) => p.status === "disponible").length}
            </p>
            <p className="text-sm text-muted-foreground">Disponibles</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card">
            <AlertCircle className="h-6 w-6 text-destructive mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {vendorProducts.filter((p) => p.status === "epuise").length}
            </p>
            <p className="text-sm text-muted-foreground">Épuisés</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("produits")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "produits"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Package className="h-4 w-4 inline mr-2" />
            Mes produits
          </button>
          <button
            onClick={() => setActiveTab("commandes")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "commandes"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <ShoppingCart className="h-4 w-4 inline mr-2" />
            Commandes reçues
          </button>
          <button
            onClick={() => setActiveTab("profil")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "profil"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Mon profil
          </button>
        </div>

        {/* Content */}
        {activeTab === "produits" && (
          <div className="space-y-4">
            {/* Add Product Button */}
            <div className="flex justify-end">
              <Button onClick={() => toast.info("Fonctionnalité à venir")} className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter un produit
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid gap-4">
              {vendorProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-card rounded-2xl border border-border p-4 flex gap-4 items-center"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground line-clamp-1">
                        {product.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          product.status === "disponible"
                            ? "bg-green-100 text-green-700"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {product.status === "disponible" ? "Disponible" : "Épuisé"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.category} • Stock: {product.stock}
                    </p>
                    <p className="text-lg font-bold text-primary mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast.info("Modifier le produit")}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast.info("Basculer disponibilité")}
                    >
                      {product.status === "disponible" ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => toast.error("Produit supprimé")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "commandes" && (
          <div className="space-y-4">
            {vendorOrders.length > 0 ? (
              vendorOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {order.clientName}
                        </h3>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                            order.status === "en_attente"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.status === "en_attente" ? "En attente" : "Terminé"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        📞 {order.clientPhone}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-2 mb-4">
                    {order.products.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  {order.message && (
                    <div className="p-3 bg-accent/10 rounded-xl mb-4">
                      <p className="text-sm text-foreground">
                        💬 {order.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.open(`tel:${order.clientPhone}`, "_blank");
                      }}
                    >
                      📞 Appeler
                    </Button>
                    {order.status === "en_attente" && (
                      <Button
                        size="sm"
                        onClick={() => toast.success("Commande marquée comme terminée")}
                      >
                        ✅ Marquer terminé
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune commande
                </h3>
                <p className="text-muted-foreground">
                  Vous n'avez pas encore reçu de commande.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "profil" && (
          <div className="max-w-xl">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Informations de retrait
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Nom
                  </label>
                  <input
                    type="text"
                    defaultValue="Fatou Diallo"
                    className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+221 77 123 45 67"
                    className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Pavillon
                    </label>
                    <input
                      type="text"
                      defaultValue="Pavillon A"
                      className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Chambre
                    </label>
                    <input
                      type="text"
                      defaultValue="204"
                      className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <Button onClick={() => toast.success("Profil mis à jour")} className="w-full">
                  Enregistrer
                </Button>
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-card rounded-2xl border border-border p-6 mt-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Abonnement
              </h2>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div>
                  <p className="font-medium text-green-700">Abonnement actif</p>
                  <p className="text-sm text-green-600">Expire le 10 février 2025</p>
                </div>
                <BadgeCheck className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Renouvellement : 1 000 FCFA/mois via Wave ou Orange Money
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
