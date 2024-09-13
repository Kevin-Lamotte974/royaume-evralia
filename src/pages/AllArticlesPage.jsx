import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DEVB_ROUTE } from '../routes/Routes';

const AllArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 30; // Afficher 9 articles (3 colonnes * 3 lignes)

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

    // Calculer les articles à afficher pour la page actuelle
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
                <h1 className="text-3xl font-bold mb-4">Tous les Articles</h1>

                {/* Liste des articles */}
                <ul className="flex flex-wrap max-h-full">
                    {currentArticles.map((article) => (
                        <li key={article.id} className="mb-2 p-2" style={{ minWidth: 'calc(33.33% - 20px)' }}>
                            <Link to={`/${article.slug}`} className="text-pink-300 hover:underline">
                                {article.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-pink-500 text-white' : 'bg-gray-700 text-secondary hover:bg-pink-300'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllArticlesPage;
