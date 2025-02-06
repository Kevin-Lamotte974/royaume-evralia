import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { FaPlus, FaSearch, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'updatedAt', direction: 'desc' });
  const articlesPerPage = 10;

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

  // Filtrer les articles en fonction de la recherche
  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
    setCurrentPage(1);
  }, [searchTerm, articles]);

  // Calculer les articles de la page courante
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Nouvelle fonction de tri
  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredArticles].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredArticles(sortedData);
  };

  // Helper pour l'icône de tri
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  if (loading) return <LoadingSpinner />;

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

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortData('title')}
              >
                Titre {getSortIcon('title')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortData('categoryName')}
              >
                Catégorie {getSortIcon('categoryName')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortData('updatedAt')}
              >
                Update {getSortIcon('updatedAt')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentArticles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap"><Link to={`/${article.slug}`}>{article.title}</Link></td>
                <td className="px-6 py-4 whitespace-nowrap">{article.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(article.updatedAt).toLocaleDateString()} - {new Date(article.updatedAt).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 flex justify-end items-center whitespace-nowrap font-medium">
                  <Link
                    to={`/admin/articles/edit/${article.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Précédent
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ArticleManager;
