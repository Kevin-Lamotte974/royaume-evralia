import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { DEVB_ROUTE } from '../routes/Routes';

const CategoryPage = () => {
    const { id } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesResponse = await axios.get(`${DEVB_ROUTE}/api/categories/${id}/articles`);
                setArticles(articlesResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des articles:', err);
                setError('Erreur lors de la récupération des articles');
                setLoading(false);
            }
        };

        fetchArticles();
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
                <h1 className="text-3xl font-bold mb-4">Articles de la catégorie {articles[0].categoryName}</h1>
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

export default CategoryPage;
