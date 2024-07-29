import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { getFavorites } from '../utils/favorites';
import PasswordPrompt from '../pages/PasswordPrompt';
import { getPassword } from '../utils/password';

const Header = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [action, setAction] = useState('');

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

    return (
        <header className="bg-primary text-secondary w-24 h-screen">
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
            {showPasswordPrompt && (
                <PasswordPrompt onPasswordSet={onPasswordSet} onClose={onClosePasswordPrompt} />
            )}
        </header>
    );
};

export default Header;
