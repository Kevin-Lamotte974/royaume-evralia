import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Panel Administrateur</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/add-page" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
          Créer un nouvel article
        </Link>
        <Link to="/add-category" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
          Créer une nouvelle catégorie
        </Link>
        <Link to="/articles" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">
          Gérer les articles
        </Link>
        <Link to="/categories" className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600">
          Gérer les catégories
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
