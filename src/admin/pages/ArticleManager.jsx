import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';  // Changement ici
import { DEVB_ROUTE } from '../../routes/Routes';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get('/api/articles');
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await axiosInstance.delete(`/api/articles/${id}`);
        fetchArticles();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression: ' + error.response?.data?.error || error.message);
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Articles</h1>
        <Link
          to="/admin/articles/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Nouvel Article
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(article.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex justify-between items-center w-24 h-full whitespace-nowrap font-medium">
                  <Link
                    to={`/admin/articles/edit/${article.id}`}
                    className="text-blue-600 hover:text-blue-900 "
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleManager;
