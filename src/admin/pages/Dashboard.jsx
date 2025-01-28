import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DEVB_ROUTE } from '../../routes/Routes';
import { FaNewspaper, FaFolderOpen, FaUsers, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    users: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articles, categories, users] = await Promise.all([
          axios.get(`${DEVB_ROUTE}/api/articles/count`),
          axios.get(`${DEVB_ROUTE}/api/categories/count`),
          axios.get(`${DEVB_ROUTE}/api/users/count`)
        ]);

        setStats({
          articles: articles.data.count,
          categories: categories.data.count,
          users: users.data.count
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaNewspaper className="text-blue-500 text-4xl" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{stats.articles}</h2>
              <p className="text-gray-600">Articles</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaFolderOpen className="text-green-500 text-4xl" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{stats.categories}</h2>
              <p className="text-gray-600">Catégories</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FaUsers className="text-purple-500 text-4xl" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{stats.users}</h2>
              <p className="text-gray-600">Utilisateurs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => window.location.href = '/admin/articles/new'} 
                  className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <FaEdit className="mr-2" /> Nouvel article
          </button>
          <button onClick={() => window.location.href = '/admin/categories/new'}
                  className="flex items-center justify-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <FaFolderOpen className="mr-2" /> Nouvelle catégorie
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
