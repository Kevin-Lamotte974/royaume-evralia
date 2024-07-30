import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { getPassword } from '../utils/password';
import PasswordPrompt from './PasswordPrompt';
import { DEVB_ROUTE } from '../routes/Routes';

const EditPage = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [trait, setTrait] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getPassword());

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(DEVB_ROUTE + `/api/articles/${slug}`);
        const { title, content, categoryId, trait } = response.data;
        setTitle(title);
        setContent(content);
        setCategoryId(categoryId);
        setUrl(slug);
        setTrait(trait);
      } catch (err) {
        setError('Article non trouvé');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(DEVB_ROUTE + '/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    };

    fetchArticle();
    fetchCategories();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(DEVB_ROUTE + `/api/articles/${slug}`, {
        title,
        content,
        categoryId,
        url,
        trait
      });
      alert('Page mise à jour avec succès!');
      navigate(`/${url}`, { state: { updated: true } }); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la page:', error);
      setError('Erreur lors de la mise à jour de la page');
    }
  };

  const onPasswordSet = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <PasswordPrompt onPasswordSet={onPasswordSet} />;
  }

  if (error) {
    return <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Erreur</h1>
      <p>{error}</p>
    </div>;
  }

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <div className="bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg flex flex-col text-secondary">
        <h1 className="text-4xl font-bold mb-4">Éditer la Page</h1>
        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
          <div className='flex w-full'>
            <div className="w-2/3 mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-1/3 mb-4 ml-2">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="url">
                Url
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4 flex-grow flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="content">
              Contenu
            </label>
            <div className="flex-grow">
              <Editor
                apiKey='cqzzbepc5yiumkaoj4nkrg1xcw2bzni17zjjdwgcu3dr69px'
                value={content}
                init={{
                  plugins: 'link image code',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                }}
                onEditorChange={(content, editor) => setContent(content)}
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="mb-4 w-1/2">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="category">
                Catégorie
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 w-1/2 ml-2">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="trait">
                Trait
              </label>
              <select
                id="trait"
                value={trait}
                onChange={(e) => setTrait(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Neutre">Neutre</option>
                <option value="Vie">Vie</option>
                <option value="Néant">Néant</option>
              </select>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
            Mettre à jour la Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
