import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DEVB_ROUTE } from '../routes/Routes';
import { FaTrash } from "react-icons/fa";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${DEVB_ROUTE}/api/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${DEVB_ROUTE}/api/categories`, {
                name
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Catégorie ajoutée avec succès !');
            fetchCategories();
            setName('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            return;
        }
        try {
            await axios.delete(`${DEVB_ROUTE}/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie:', error);
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg flex flex-col text-secondary">
                <h1 className="text-4xl font-bold mb-4">Ajouter une Nouvelle Catégorie</h1>
                <form className="flex flex-col h-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                            Nom de la Catégorie
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Chargement...
                            </div>
                        ) : (
                            'Ajouter la Catégorie'
                        )}
                    </button>
                </form>
                <h2 className="text-3xl font-bold mt-6">Catégories</h2>
                <ul className="mt-4">
                    {categories.map((category) => (
                        <li key={category.id} className="flex items-center justify-between mb-2 bg-gray-800 p-2 rounded">
                            <span>{category.name}</span>
                            <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddCategory;
