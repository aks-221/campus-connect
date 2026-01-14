import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, BadgeCheck, MapPin, Phone, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/data/mockData";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Produit non trouvé
          </h1>
          <p className="text-muted-foreground mb-6">
            Ce produit n'existe pas ou a été supprimé.
          </p>
          <Link to="/produits">
            <Button>Voir tous les produits</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const handleAddToCart = () => {
    if (product.status === "epuise") {
      toast.error("Ce produit est épuisé");
      return;
    }
    
    const success = addToCart(product);
    if (success) {
      toast.success("Produit ajouté au panier");
    } else {
      toast.error("Vous ne pouvez commander qu'auprès d'un seul vendeur à la fois. Videz votre panier pour commander auprès d'un autre vendeur.");
    }
  };

  const handleDirectOrder = () => {
    const message = encodeURIComponent(
      `Bonjour ${product.vendeurName}, je suis intéressé(e) par votre produit "${product.name}" à ${formatPrice(product.price)} sur UAM Commerce.`
    );
    window.open(`https://wa.me/${product.vendeurPhone.replace(/\s+/g, "")}?text=${message}`, "_blank");
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Link
          to="/produits"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux produits
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Status badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.status === "epuise" && (
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-destructive text-destructive-foreground">
                  Épuisé
                </span>
              )}
              {product.stock <= 2 && product.stock > 0 && (
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-destructive text-destructive-foreground">
                  Plus que {product.stock} !
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toast.success("Ajouté aux favoris")}
              className="absolute top-4 right-4 p-3 rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors shadow-md"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-primary mt-4">
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            <p className="text-muted-foreground mt-6 leading-relaxed">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${
                product.status === "disponible" ? "bg-green-500" : "bg-destructive"
              }`}></span>
              <span className="text-sm text-muted-foreground">
                {product.status === "disponible" 
                  ? `${product.stock} en stock`
                  : "Produit épuisé"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.status === "epuise"}
                className="flex-1 gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDirectOrder}
                className="flex-1 gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Commander directement
              </Button>
            </div>

            {/* Vendor Info */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {product.vendeurName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      {product.vendeurName}
                    </h3>
                    {product.isVendeurVerified && (
                      <BadgeCheck className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Vendeur vérifié</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-foreground">
                    {product.vendeurPavilion}, {product.vendeurChambre}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <a 
                    href={`tel:${product.vendeurPhone}`}
                    className="text-primary hover:underline"
                  >
                    {product.vendeurPhone}
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  💡 Le paiement et la remise se font directement entre étudiants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
