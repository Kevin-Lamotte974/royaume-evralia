import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DEVB_ROUTE } from '../routes/Routes';

const AllCategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(DEVB_ROUTE + '/api/categories');
                setCategories(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des catégories:', err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="flex flex-col relative bg-gradient-to-r from-gray-900 via-blue-950 to-gray-700 w-3/4 h-4/5 p-6 rounded-xl shadow-2xl text-white z-30">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-secondary">Toutes les Catégories</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white p-6 rounded-lg shadow-lg w-60 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Link to={`/categories/${category.id}`} className="block text-xl font-medium text-gray-800 hover:text-blue-600 text-center transition-colors duration-300">
                                {category.name}
                            </Link>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default AllCategoriesPage;
