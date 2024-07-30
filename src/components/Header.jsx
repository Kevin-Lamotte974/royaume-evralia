import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getFavorites } from '../utils/favorites';
import PasswordPrompt from '../pages/PasswordPrompt';
import { getPassword } from '../utils/password';
import axios from 'axios';
import { DEVB_ROUTE } from '../routes/Routes';

const Header = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [action, setAction] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const updateFavorites = () => {
            setFavorites(getFavorites());
        };

        // Update favorites on mount
        updateFavorites();

        // Listen to storage events to update favorites in real-time
        window.addEventListener('storage', updateFavorites);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('storage', updateFavorites);
        };
    }, []);

    useEffect(() => {
        const fetchArticlesAndCategories = async () => {
            try {
                const articlesResponse = await axios.get(DEVB_ROUTE + '/api/articles');
                const categoriesResponse = await axios.get(DEVB_ROUTE + '/api/categories');
                setArticles(articlesResponse.data);
                setCategories(categoriesResponse.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des articles et des catégories:', err);
            }
        };

        fetchArticlesAndCategories();
    }, []);

    const handleAddPage = () => {
        if (getPassword()) {
            navigate('/add-page');
        } else {
            setAction('add');
            setShowPasswordPrompt(true);
        }
    };

    const handleAddCategory = () => {
        if (getPassword()) {
            navigate('/add-category');
        } else {
            setAction('add-category');
            setShowPasswordPrompt(true);
        }
    };

    const onPasswordSet = () => {
        setShowPasswordPrompt(false);
        if (action === 'add') {
            navigate('/add-page');
        } else if (action === 'add-category') {
            navigate('/add-category');
        }
    };

    const onClosePasswordPrompt = () => {
        setShowPasswordPrompt(false);
    };

    const getInitials = (title) => {
        return title
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get(DEVB_ROUTE + `/api/articles/sb/search?q=${query}`);
                setSearchResults(response.data);
            } catch (err) {
                console.error('Erreur lors de la recherche:', err);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <header className="bg-primary text-secondary w-24 h-screen relative">
            <div className="h-full w-full container mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center text-2xl font-bold mb-4 w-full">
                    <Link className="mt-6" to="/accueil">LRD</Link>
                    <hr className="my-4 w-2/3 border-secondary" />
                </div>
                <div className="flex-grow overflow-y-auto w-full">
                    <div className="flex flex-col items-center space-y-2">
                        {favorites.map((article) => (
                            <Link
                                key={article.id}
                                to={`/${article.slug}`}
                                className="text-secondary hover:text-white"
                                title={article.title}
                            >
                                {getInitials(article.title)}
                            </Link>
                        ))}
                    </div>
                </div>
                <button onClick={handleAddPage} className="flex justify-center items-center bg-green-500/80 hover:bg-green-500 text-white font-bold p-4 rounded mb-2">
                    Page <FaPlus className="ml-1"/>
                </button>
                <button onClick={handleAddCategory} className="flex justify-center items-center bg-blue-500/80 hover:bg-blue-500 text-white font-bold p-4 rounded">
                    Caté <FaPlus className="ml-1"/>
                </button>
            </div>
            <div className={`fixed top-8 right-8 z-40 transition-transform duration-300 ${isSidebarOpen ? 'mr-64' : ''}`}>
                <form className="relative z-40">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Chercher..."
                        className="pl-4 pr-8 py-2 rounded-full bg-gray-900 text-secondary placeholder-white::placeholder focus:outline-none"
                    />
                    {searchResults.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-gray-900 border border-gray-800 text-secondary mt-1 rounded-md shadow-lg max-h-60 overflow-auto z-40">
                            {searchResults.map((result) => (
                                <li
                                    key={result.id}
                                    className="p-2 cursor-pointer hover:bg-gray-800 z-40"
                                    onClick={() => navigate(`/${result.slug}`)}
                                >
                                    <span className="font-bold">{result.title}</span>
                                    <p>{result.content.substring(0, 50)}...</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
            {showPasswordPrompt && (
                <PasswordPrompt onPasswordSet={onPasswordSet} onClose={onClosePasswordPrompt} />
            )}

            <div className={`fixed top-0 right-0 h-full z-40 bg-gray-800 shadow-lg transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={toggleSidebar} className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-gray-900 p-2 rounded-l">
                    {isSidebarOpen ? <FaArrowRight className="text-white" /> : <FaArrowLeft className="text-white" />}
                </button>
                <div className="p-4 text-white">
                    <h2 className="text-2xl font-bold mb-4">Menu</h2>
                    <ul>
                        <li className="mb-2">
                            <Link to="/articles" className="text-white">Tous les articles</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/categories" className="text-white">Toutes les catégories</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/add-page" className="text-white">Ajouter une page</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/add-category" className="text-white">Ajouter une catégorie</Link>
                        </li>
                    </ul>                    
                </div>
            </div>
        </header>
    );
};

export default Header;
