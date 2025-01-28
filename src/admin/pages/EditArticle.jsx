import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import ArticleForm from '../components/ArticleForm';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle();
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

  const handleSubmit = async (formData) => {
    try {
      const response = await axiosInstance.put(`/api/articles/${id}`, {
        title: formData.title,
        content: formData.content,
        categoryId: parseInt(formData.categoryId),
        trait: formData.trait
      });

      if (response.data) {
        navigate('/admin/articles');
      } else {
        setError('Erreur lors de la modification de l\'article');
      }
    } catch (error) {
      console.error('Erreur détaillée:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Erreur lors de la modification de l\'article');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Modifier l'article</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {article && <ArticleForm article={article} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default EditArticle;
