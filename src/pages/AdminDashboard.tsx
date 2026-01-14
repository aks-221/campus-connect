import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Search,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import uamLogo from "@/assets/uam-logo.png";
import { mockProducts, mockOrders, mockVendeurs, categories } from "@/data/mockData";

type Tab = "apercu" | "vendeurs" | "clients" | "produits" | "commandes" | "abonnements" | "stats" | "parametres";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("apercu");
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "apercu", label: "Aperçu", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "vendeurs", label: "Vendeurs", icon: <Store className="h-4 w-4" /> },
    { id: "clients", label: "Clients", icon: <Users className="h-4 w-4" /> },
    { id: "produits", label: "Produits", icon: <Package className="h-4 w-4" /> },
    { id: "commandes", label: "Commandes", icon: <ShoppingCart className="h-4 w-4" /> },
    { id: "abonnements", label: "Abonnements", icon: <CreditCard className="h-4 w-4" /> },
    { id: "stats", label: "Statistiques", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "parametres", label: "Paramètres", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={uamLogo} alt="UAM" className="h-10 w-auto" />
            <div>
              <span className="text-lg font-bold text-primary font-display">
                UAM Commerce
              </span>
              <p className="text-[10px] text-muted-foreground -mt-1">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Retour boutique
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive mt-1">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <Link to="/" className="flex items-center gap-2">
                <img src={uamLogo} alt="UAM" className="h-8 w-auto" />
                <span className="font-bold text-primary">Admin</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-display font-bold text-foreground">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
            </div>
            
            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden flex gap-2 overflow-x-auto mt-4 pb-2">
            {tabs.slice(0, 4).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Aperçu */}
          {activeTab === "apercu" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <Store className="h-8 w-8 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">{mockVendeurs.length}</p>
                  <p className="text-sm text-muted-foreground">Vendeurs</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <Users className="h-8 w-8 text-accent mb-3" />
                  <p className="text-3xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Clients</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <Package className="h-8 w-8 text-terracotta mb-3" />
                  <p className="text-3xl font-bold text-foreground">{mockProducts.length}</p>
                  <p className="text-sm text-muted-foreground">Produits</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <ShoppingCart className="h-8 w-8 text-green-500 mb-3" />
                  <p className="text-3xl font-bold text-foreground">{mockOrders.length}</p>
                  <p className="text-sm text-muted-foreground">Commandes</p>
                </div>
              </div>

              {/* Revenue */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">
                  💰 Revenus prévisionnels (abonnements)
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-600">Actifs</p>
                    <p className="text-2xl font-bold text-green-700">2</p>
                    <p className="text-xs text-green-600">{formatPrice(2000)}/mois</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <p className="text-sm text-amber-600">Essai gratuit</p>
                    <p className="text-2xl font-bold text-amber-700">1</p>
                    <p className="text-xs text-amber-600">Expire bientôt</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl">
                    <p className="text-sm text-red-600">Expirés</p>
                    <p className="text-2xl font-bold text-red-700">1</p>
                    <p className="text-xs text-red-600">À recontacter</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">
                    📦 Derniers produits
                  </h3>
                  <div className="space-y-3">
                    {mockProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">par {product.vendeurName}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary">{formatPrice(product.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">
                    🛒 Dernières commandes
                  </h3>
                  <div className="space-y-3">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {order.clientName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{order.clientName}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "en_attente" 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-green-100 text-green-700"
                        }`}>
                          {order.status === "en_attente" ? "En attente" : "Terminé"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vendeurs */}
          {activeTab === "vendeurs" && (
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Vendeur</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Contact</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Localisation</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Abonnement</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVendeurs.map((vendeur) => (
                      <tr key={vendeur.id} className="border-t border-border">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {vendeur.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{vendeur.name}</span>
                                {vendeur.isVerified && <BadgeCheck className="h-4 w-4 text-accent" />}
                              </div>
                              <span className="text-xs text-muted-foreground">{vendeur.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{vendeur.phone}</td>
                        <td className="p-4 text-sm text-muted-foreground">{vendeur.pavilion}, {vendeur.chambre}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            vendeur.subscriptionStatus === "actif" 
                              ? "bg-green-100 text-green-700"
                              : vendeur.subscriptionStatus === "essai"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {vendeur.subscriptionStatus === "actif" ? "Actif" : vendeur.subscriptionStatus === "essai" ? "Essai" : "Expiré"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => toast.info("Voir détails")}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!vendeur.isVerified && (
                              <Button variant="ghost" size="icon" onClick={() => toast.success("Vendeur vérifié")}>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => toast.error("Vendeur suspendu")}>
                              <Ban className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Produits */}
          {activeTab === "produits" && (
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Produit</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Vendeur</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Prix</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Stock</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Statut</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProducts.map((product) => (
                      <tr key={product.id} className="border-t border-border">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                              <img src={product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{product.vendeurName}</td>
                        <td className="p-4 text-sm font-semibold text-primary">{formatPrice(product.price)}</td>
                        <td className="p-4 text-sm text-muted-foreground">{product.stock}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            product.status === "disponible" 
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {product.status === "disponible" ? "Disponible" : "Épuisé"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => toast.info("Voir produit")}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toast.error("Produit supprimé")}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Abonnements */}
          {activeTab === "abonnements" && (
            <div className="space-y-6">
              {/* Alerts */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">1 vendeur avec abonnement expiré</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Aissatou Ndiaye - Expiré depuis le 1 janvier 2025
                  </p>
                </div>
              </div>

              {/* Subscription List */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Vendeur</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Statut</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Expiration</th>
                      <th className="text-left text-sm font-medium text-muted-foreground p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVendeurs.map((vendeur) => (
                      <tr key={vendeur.id} className="border-t border-border">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {vendeur.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{vendeur.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            vendeur.subscriptionStatus === "actif" 
                              ? "bg-green-100 text-green-700"
                              : vendeur.subscriptionStatus === "essai"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {vendeur.subscriptionStatus === "actif" ? "✓ Actif" : vendeur.subscriptionStatus === "essai" ? "🎁 Essai gratuit" : "⚠ Expiré"}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatDate(vendeur.subscriptionEndDate)}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {vendeur.subscriptionStatus === "expire" && (
                              <>
                                <Button size="sm" onClick={() => toast.success("Abonnement activé")}>
                                  Activer
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => toast.info("Rappel envoyé")}>
                                  Rappeler
                                </Button>
                              </>
                            )}
                            {vendeur.subscriptionStatus !== "expire" && (
                              <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.error("Vendeur suspendu")}>
                                Suspendre
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">
                    🏆 Produits les plus populaires
                  </h3>
                  <div className="space-y-4">
                    {mockProducts.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.vendeurName}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 50) + 10} vues</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Vendors */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">
                    ⭐ Vendeurs les plus actifs
                  </h3>
                  <div className="space-y-4">
                    {mockVendeurs.map((vendeur, index) => (
                      <div key={vendeur.id} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {vendeur.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">{vendeur.name}</p>
                            {vendeur.isVerified && <BadgeCheck className="h-4 w-4 text-accent" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 10) + 1} produits</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 20) + 5} commandes</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">
                  📊 Répartition par catégorie
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map((cat) => (
                    <div key={cat.id} className="text-center p-4 bg-secondary/50 rounded-xl">
                      <span className="text-3xl">{cat.icon}</span>
                      <p className="text-sm font-medium text-foreground mt-2">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 30) + 5} produits</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paramètres */}
          {activeTab === "parametres" && (
            <div className="max-w-2xl space-y-6">
              {/* Categories */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  Catégories de produits
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="font-medium text-foreground">{cat.name}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("Ajouter une catégorie")}>
                  + Ajouter une catégorie
                </Button>
              </div>

              {/* Campus */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  Informations du campus
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Nom de l'université
                    </label>
                    <input
                      type="text"
                      defaultValue="Université Amadou Mahtar Mbow de Dakar"
                      className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Prix abonnement mensuel (FCFA)
                    </label>
                    <input
                      type="number"
                      defaultValue={1000}
                      className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <Button className="mt-4" onClick={() => toast.success("Paramètres enregistrés")}>
                  Enregistrer
                </Button>
              </div>
            </div>
          )}

          {/* Clients */}
          {activeTab === "clients" && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Gestion des clients
              </h3>
              <p className="text-muted-foreground">
                156 clients inscrits sur la plateforme
              </p>
            </div>
          )}

          {/* Commandes */}
          {activeTab === "commandes" && (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Commande #{order.id}</p>
                      <h3 className="font-semibold text-foreground">{order.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      order.status === "en_attente" 
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {order.status === "en_attente" ? "En attente retrait" : "Terminé"}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Vendeur: {order.products[0]?.product.vendeurName}</p>
                    <p>Produits: {order.products.map(p => p.product.name).join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
