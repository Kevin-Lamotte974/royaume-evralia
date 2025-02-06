import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">À propos d'Evralia</h3>
            <p className="text-sm">
              Evralia est un univers créé par moi et pour moi.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Accueil</Link></li>
              <li><Link to="/map" className="hover:text-blue-400">Carte</Link></li>
              <li><Link to="/articles" className="hover:text-blue-400">Articles</Link></li>
              <li><Link to="/categories" className="hover:text-blue-400">Catégories</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li><Link to="/legal" className="hover:text-blue-400">Mentions légales</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="https://discord.gg/NjYQTHBgPP" target="_blank" rel="noopener noreferrer" 
                 className="text-2xl hover:text-blue-400">
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Evralia. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
