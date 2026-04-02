import { Link } from "react-router-dom";
import uamLogo from "@/assets/uam-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={uamLogo} alt="UAM" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              La plateforme met en relation, le paiement et la remise se font 
              directement entre étudiants.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                Cash
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">
                Wave
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-600 font-medium">
                Orange Money
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Catégories
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendeurs */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Vendeurs
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/inscription-vendeur" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Devenir vendeur
                </Link>
              </li>
              <li>
                <Link to="/vendeur" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Espace vendeur
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  vendez gratuitement
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Université Amadou Mahtar Mbow
              </li>
              <li className="text-sm text-muted-foreground">
                Dakar, Sénégal
              </li>
              <li>
                <a href="mailto:contact@uamcommerce.sn" className="text-sm text-primary hover:underline">
                  contact@uamcommerce.sn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 UAM Commerce. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
