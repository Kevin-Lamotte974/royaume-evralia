import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TinyMCECustom from '../components/TinyMCECustom';
import { DEVB_ROUTE } from '../routes/Routes';
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [trait, setTrait] = useState('Neutre');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(DEVB_ROUTE + '/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const generateSlug = (title) => {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/-+/g, '-');
        };

        setSlug(generateSlug(title));
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(DEVB_ROUTE + '/api/articles', {
                title,
                slug,
                content,
                categoryId,
                trait
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Page ajoutée avec succès !');
            navigate(`/${slug}`, { state: { updated: true } });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la page:', error);
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg flex flex-col text-secondary">
                <h1 className="text-4xl font-bold mb-4">Ajouter une Nouvelle Page</h1>
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
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="slug">
                                Url
                            </label>
                            <input
                                type="text"
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex-grow flex flex-col">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="content">
                            Contenu
                        </label>
                        <div className="flex-grow">
                            <TinyMCECustom
                                data={content}
                                onChange={(content) => setContent(content)}
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
                        Ajouter la Page
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPage;
