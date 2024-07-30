import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DEVB_ROUTE } from '../routes/Routes';

const AllArticlesPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(DEVB_ROUTE + '/api/articles');
                setArticles(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des articles:', err);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
                <h1 className="text-3xl font-bold mb-4">Tous les Articles</h1>
                <ul>
                    {articles.map((article) => (
                        <li key={article.id} className="mb-2">
                            <Link to={`/${article.slug}`} className="text-pink-300 hover:underline">
                                {article.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllArticlesPage;
