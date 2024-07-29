import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Error404 from './Error404';
import PasswordPrompt from './PasswordPrompt';
import { getPassword } from '../utils/password';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';
import { FaEdit, FaStar } from "react-icons/fa";
import { DEVB_ROUTE } from '../routes/Routes';

const HomePage = () => {
    const { slug } = useParams();
    const [content, setContent] = useState(null);
    const [error, setError] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [action, setAction] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFav, setIsFav] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get(DEVB_ROUTE + `/api/articles/${slug}`);
                    setContent(response.data);
                    setIsFav(isFavorite(response.data.id));
                } catch (err) {
                    setError('Article non trouvé');
                }
            };

            fetchArticle();
        }
    }, [slug]);

    const handleAddPage = () => {
        if (getPassword()) {
            navigate('/add-page');
        } else {
            setAction('add');
            setShowPasswordPrompt(true);
        }
    };

    const handleEditPage = () => {
        if (getPassword()) {
            navigate(`/edit/${slug}`);
        } else {
            setAction('edit');
            setShowPasswordPrompt(true);
        }
    };

    const handleFavoritePage = () => {
        if (content) {
            if (isFav) {
                removeFavorite(content.id);
            } else {
                addFavorite(content);
            }
            setIsFav(!isFav);
        }
    };

    const onPasswordSet = () => {
        setShowPasswordPrompt(false);
        if (action === 'add') {
            navigate('/add-page');
        } else if (action === 'edit') {
            navigate(`/edit/${slug}`);
        }
    };

    const onClosePasswordPrompt = () => {
        setShowPasswordPrompt(false);
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get(DEVB_ROUTE + `/api/search?q=${query}`);
                setSearchResults(response.data);
            } catch (err) {
                console.error('Erreur lors de la recherche:', err);
            }
        } else {
            setSearchResults([]);
        }
    };

    if (error) {
        return <Error404 />;
    }

    return (
        <>
            <div className="absolute right-8 top-8">
                <form className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Chercher..."
                        className="pl-4 pr-8 py-2 w-full rounded-full text-black focus:outline-none"
                    />
                </form>
                {searchResults.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                        {searchResults.map((result) => (
                            <li
                                key={result.id}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => navigate(`/${result.slug}`)}
                            >
                                <span className="font-bold">{result.title}</span>
                                <p>{result.content.substring(0, 50)}...</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {slug && (
                <div className="flex flex-col h-full items-center justify-center p-4">
                    <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
                        <div className="absolute right-2 top-2 space-x-2">
                            <button onClick={handleEditPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded">
                                <FaEdit />
                            </button>
                            <button
                                onClick={handleFavoritePage}
                                className={`p-4 rounded ${isFav ? 'bg-red-500 hover:bg-red-700' : 'bg-yellow-500 hover:bg-yellow-700'} text-white font-bold`}
                            >
                                <FaStar />
                            </button>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{content?.title}</h1>
                        <p className="text-xl mb-2">Category: {content?.category?.name}</p>
                        <div className="custom-content" dangerouslySetInnerHTML={{ __html: content?.content }} />
                    </div>
                </div>
            )}

            {showPasswordPrompt && (
                <PasswordPrompt onPasswordSet={onPasswordSet} onClose={onClosePasswordPrompt} />
            )}
        </>
    );
};

export default HomePage;
