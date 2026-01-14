import { Link } from "react-router-dom";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/produits?categorie=${category.name}`}
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-card card-hover"
    >
      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
        {category.icon}
      </span>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </span>
    </Link>
  );
};

export default CategoryCard;
