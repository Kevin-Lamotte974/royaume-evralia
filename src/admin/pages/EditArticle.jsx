import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import RichTextEditor from '../../components/RichTextEditor';
import Loading from '../../components/Loading';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchArticle();
    fetchCategories();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axiosInstance.get(`/api/articles/${id}`);
      console.log('Article récupéré:', response.data);
      setArticle({
        ...response.data,
        categoryId: response.data.categoryId?.toString()
      });
    } catch (error) {
      setError('Erreur lors de la récupération de l\'article');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/api/articles/${id}`, {
        title: article.title,
        content: article.content,
        categoryId: article.categoryId ? parseInt(article.categoryId) : null,
        trait: article.trait || 'Neutre'
      });

      if (response.data) {
        navigate('/admin/articles');
      } else {
        setError('Erreur lors de la modification de l\'article');
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
      setError(error.response?.data?.error || 'Erreur lors de la modification de l\'article');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Modifier l'article</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {article && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contenu</label>
              <div className="mt-1">
                <RichTextEditor
                  value={article.content}
                  onChange={(content) => setArticle({ ...article, content })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  value={article.categoryId || ''}
                  onChange={(e) => setArticle({ ...article, categoryId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Trait</label>
                <select
                  value={article.trait || 'Neutre'}
                  onChange={(e) => setArticle({ ...article, trait: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Neutre">Neutre</option>
                  <option value="Vie">Vie</option>
                  <option value="Néant">Néant</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Mettre à jour l'article
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditArticle;
