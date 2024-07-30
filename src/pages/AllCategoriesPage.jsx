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
            <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
                <h1 className="text-3xl font-bold mb-4">Toutes les Catégories</h1>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id} className="mb-2">
                            <Link to={`/categories/${category.id}`} className="text-pink-300 hover:underline">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllCategoriesPage;
