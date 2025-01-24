import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DEVB_ROUTE } from '../routes/Routes';

const AllArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]); // État pour les catégories
    const [selectedCategory, setSelectedCategory] = useState(''); // État pour la catégorie sélectionnée
    const articlesPerPage = 30; // Nombre d'articles par page

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(DEVB_ROUTE + '/api/articles');
                const response2 = await axios.get(DEVB_ROUTE + '/api/categories');
                setCategories(response2.data);
                // Trier les articles par titre avant de les stocker
                const sortedArticles = response.data.sort((a, b) => a.title.localeCompare(b.title));
                setArticles(sortedArticles);
            } catch (err) {
                console.error('Erreur lors de la récupération des articles:', err);
            }
        };

        fetchArticles();
    }, []);

    // Calculer les articles à afficher pour la page actuelle
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    // Filtrer les articles par catégorie sélectionnée (comparer le categoryId de l'article avec la catégorie sélectionnée)
    const filteredArticles = selectedCategory
        ? articles.filter(article => article.categoryId === parseInt(selectedCategory)) // Compare categoryId avec selectedCategory (converti en entier)
        : articles;

    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculer le nombre total de pages après filtrage
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    return (
        <div className="flex flex-col h-full items-center justify-center p-4">
            <div className="flex flex-col relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
                <h1 className="text-3xl font-bold mb-4">Tous les Articles</h1>

                {/* Sélection de la catégorie */}
                <div className="mb-4">
                    <label htmlFor="category" className="text-lg font-medium">Filtrer par catégorie :</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); // Réinitialiser à la première page lors du changement de catégorie
                        }}
                        className="ml-2 p-2 bg-gray-700 text-white rounded-lg"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Liste des articles affichés verticalement */}
                <ul className="flex flex-col flex-wrap h-3/4">
                    {currentArticles.map((article) => (<>
                        <li key={article.id} className="mb-2 p-2">
                            <Link to={`/${article.slug}`} className="text-pink-300 hover:underline">
                                {article.title}
                            </Link>
                        </li>
                        </>
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
