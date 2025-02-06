import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { DEVB_ROUTE } from '../../routes/Routes';
import { FaNewspaper, FaFolderOpen, FaUsers, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    users: 0
  });
  const [unreadComments, setUnreadComments] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articles, categories, users] = await Promise.all([
          axiosInstance.get('/api/articles/count'),
          axiosInstance.get('/api/categories/count'),
          axiosInstance.get('/api/users/count')
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
    fetchUnreadComments();
    fetchUnreadCount();
  }, []);

  const fetchUnreadComments = async () => {
    try {
      console.log('Fetching unread comments...'); // Debug log
      const response = await axiosInstance.get('/api/comments/unread');
      console.log('Unread comments response:', response.data); // Debug log
      setUnreadComments(response.data);
    } catch (error) {
      console.error('Erreur récupération commentaires:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      console.log('Fetching unread count...'); // Debug log
      const response = await axiosInstance.get('/api/comments/unread/count');
      console.log('Unread count response:', response.data); // Debug log
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Erreur comptage commentaires:', error);
    }
  };

  const markAsRead = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axiosInstance.put(`/api/comments/${commentId}/read`, {}, config);
      fetchUnreadComments();
      fetchUnreadCount();
    } catch (error) {
      console.error('Erreur marquage commentaire:', error);
    }
  };

  const handleCommentClick = async (comment) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axiosInstance.put(`/api/comments/${comment.id}/read`, {}, config);
      await fetchUnreadComments();
      await fetchUnreadCount();
      navigate(`/${comment.articleSlug}#comments`);
    } catch (error) {
      console.error('Erreur lors du traitement du commentaire:', error);
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/admin/articles/new" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
            Créer un nouvel article
          </Link>
          <Link to="/admin/categories/new" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
            Créer une nouvelle catégorie
          </Link>
          <Link to="/admin/articles" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">
            Gérer les articles
          </Link>
          <Link to="/admin/categories" className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600">
            Gérer les catégories
          </Link>
          <Link to="/admin/users" className="bg-red-500 text-white p-4 rounded hover:bg-red-600">
            Gérer les utilisateurs
          </Link>
          <Link to="/admin/maps" className="bg-cyan-500 text-white p-4 rounded hover:bg-cyan-600">
            Gérer les cartes
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Commentaires non-lus ({unreadCount})
          </h2>
          {unreadCount > 0 && (
            <span className="text-red-500 animate-pulse">
              ● Nouveaux commentaires
            </span>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          {unreadComments.map((comment) => (
            <div key={comment.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => handleCommentClick(comment)}
                >
                  <h3 className="font-medium text-blue-600 hover:underline">
                    {comment.articleTitle}
                  </h3>
                  <p className="text-gray-600 mt-1">{comment.content}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>Par: {comment.username}</span>
                    <span>•</span>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(comment.id);
                  }}
                  className="ml-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm 
                           hover:bg-green-600 transition-colors"
                >
                  Marquer comme lu
                </button>
              </div>
            </div>
          ))}
          {unreadComments.length === 0 && (
            <p className="p-4 text-gray-500 text-center">
              Aucun commentaire non-lu
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
