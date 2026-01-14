import { Link } from "react-router-dom";
import { Heart, ShoppingCart, BadgeCheck } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.status === "epuise") {
      toast.error("Ce produit est épuisé");
      return;
    }
    
    const success = addToCart(product);
    if (success) {
      toast.success("Produit ajouté au panier");
    } else {
      toast.error("Vous ne pouvez commander qu'auprès d'un seul vendeur à la fois");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  if (product.status === "epuise") {
    return null; // Produit épuisé masqué automatiquement
  }

  return (
    <Link to={`/produit/${product.id}`} className="group">
      <div className="bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border/50">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badge stock faible */}
          {product.stock <= 2 && product.stock > 0 && (
            <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-medium rounded-full bg-destructive text-destructive-foreground">
              Plus que {product.stock}
            </span>
          )}
          
          {/* Favoris button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toast.success("Ajouté aux favoris");
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
            {product.category}
          </span>
          
          {/* Name */}
          <h3 className="font-medium text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Vendeur */}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-muted-foreground">
              par {product.vendeurName}
            </span>
            {product.isVendeurVerified && (
              <BadgeCheck className="h-3.5 w-3.5 text-accent" />
            )}
          </div>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleAddToCart}
              className="h-8 px-3 gap-1"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
