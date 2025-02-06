import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { DEVB_ROUTE } from '../../routes/Routes';
import RichTextEditor from '../../components/RichTextEditor';
import 'react-quill/dist/quill.snow.css';

const ArticleForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    trait: 'Neutre'
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      console.log('Article reçu dans le formulaire:', formData); // Pour debug
      setFormData({
        title: formData.title || '',
        content: formData.content || '',
        categoryId: formData.categoryId || '',
        trait: formData.trait || 'Neutre'
      });
    }
    fetchCategories();
  }, []);

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
    setLoading(true);
    try {
      // Conversion explicite de categoryId en nombre
      const formattedData = {
        ...formData,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
      };
      
      await onSubmit(formattedData);
    } catch (error) {
      console.error('Erreur dans ArticleForm:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
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
          value={formData.trait}
          onChange={(e) => setFormData({ ...formData, trait: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Neutre">Neutre</option>
          <option value="Vie">Vie</option>
          <option value="Néant">Néant</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contenu</label>
        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        {'Créer'}
      </button>
    </form>
  );
};

export default ArticleForm;
