import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Error404 from './Error404';
import PasswordPrompt from './PasswordPrompt';
import { getPassword } from '../utils/password';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import { DEVB_ROUTE } from '../routes/Routes';

const HomePage = ({ setTrait }) => {
    const { slug } = useParams();
    const [content, setContent] = useState(null);
    const [error, setError] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [action, setAction] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFav, setIsFav] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get(DEVB_ROUTE + `/api/articles/${slug}`);
                    setContent(response.data);
                    setTrait(response.data.trait);
                    setIsFav(isFavorite(response.data.id));
                } catch (err) {
                    setError('Article non trouvé');
                }
            };

            fetchArticle();
        }
    }, [slug]);

    // Ajoutez un useEffect pour détecter les changements de l'état de navigation
    useEffect(() => {
        if (navigate.state?.updated) {
            const fetchUpdatedArticle = async () => {
                try {
                    const response = await axios.get(DEVB_ROUTE + `/api/articles/${slug}`);
                    setContent(response.data);
                    setTrait(response.data.trait);
                    setIsFav(isFavorite(response.data.id));
                } catch (err) {
                    setError('Article non trouvé');
                }
            };

            fetchUpdatedArticle();
        }
    }, [navigate.state?.updated, slug]);

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

    const handleDeletePage = () => {
        setShowDeleteModal(true); // Show delete modal
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(DEVB_ROUTE + `/api/articles/${slug}`);
            setShowDeleteModal(false);
            navigate('/');
        } catch (err) {
            console.error('Erreur lors de la suppression de la page:', err);
            setError('Erreur lors de la suppression de la page');
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
                const response = await axios.get(DEVB_ROUTE + `/api/articles/sb/search?q=${query}`);
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

            {slug && (
                <div className="flex flex-col h-full items-center justify-center p-4">
                    <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary z-30">
                        <div className="absolute right-2 top-2 space-x-2">
                            <button onClick={handleDeletePage} className="bg-red-500 hover:bg-red-700 text-white font-bold p-4 rounded">
                                <FaTrash />
                            </button>
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
                        <p className="text-xl mb-2">Category: {content?.categoryName}</p>
                        <div className="custom-content" dangerouslySetInnerHTML={{ __html: content?.content }} />
                    </div>
                </div>
            )}

            {showPasswordPrompt && (
                <PasswordPrompt onPasswordSet={onPasswordSet} onClose={onClosePasswordPrompt} />
            )}

            {showDeleteModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setShowDeleteModal(false)} // Hide modal on outside click
                >
                    <div
                        className="bg-gray-800 p-8 rounded shadow-md text-center text-secondary"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <h2 className="text-2xl mb-4">Confirmer la suppression</h2>
                        <p className="mb-4">Êtes-vous sûr de vouloir supprimer cet article ?</p>
                        <div className="space-x-4">
                            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Oui, supprimer
                            </button>
                            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default HomePage;
