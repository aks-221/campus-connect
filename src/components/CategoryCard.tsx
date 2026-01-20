import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Smartphone, 
  Shirt, 
  UtensilsCrossed, 
  Briefcase, 
  Sparkles,
  Package
} from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string | null;
    description?: string | null;
  };
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Smartphone,
  Shirt,
  UtensilsCrossed,
  Briefcase,
  Sparkles,
  Package,
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const IconComponent = category.icon && iconMap[category.icon] 
    ? iconMap[category.icon] 
    : Package;

  return (
    <Link
      to={`/produits?categorie=${category.id}`}
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-card card-hover"
    >
      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors text-center">
        {category.name}
      </span>
    </Link>
  );
};

export default CategoryCard;