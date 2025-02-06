import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DEVB_ROUTE } from '../../routes/Routes';
import ArticleForm from '../components/ArticleForm';

const CreateArticle = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.post(`${DEVB_ROUTE}/api/articles`, formData, config);
      navigate('/admin/articles');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de l\'article');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Créer un nouvel article</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ArticleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateArticle;
