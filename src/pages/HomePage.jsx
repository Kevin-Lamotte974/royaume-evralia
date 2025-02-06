import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Error404 from './Error404';
import PasswordPrompt from './PasswordPrompt';
import { getPassword } from '../utils/password';
import { DEVB_ROUTE } from '../routes/Routes';
import Loading from '../components/Loading';
import { delay } from '../utils/delay';
import Comments from '../components/Comments';
import { FaComment } from "react-icons/fa";  // Remplacer FaStar par FaComment

const HomePage = ({ setTrait }) => {
    const { slug } = useParams();
    const [content, setContent] = useState(null);
    const [error, setError] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [action, setAction] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showComments, setShowComments] = useState(false);  // Ajouter cet état
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState(''); // State for password input
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                await delay(); // Ajoute un délai de 1 seconde
                const slug_to_fetch = slug || 'evralia';
                const response = await axios.get(DEVB_ROUTE + `/api/articles/${slug_to_fetch}`);
                setContent(response.data);
                setTrait(response.data.trait);
            } catch (err) {
                setError('Article non trouvé');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    // Ajoutez un useEffect pour détecter les changements de l'état de navigation
    useEffect(() => {
        if (navigate.state?.updated) {
            const fetchUpdatedArticle = async () => {
                try {
                    const response = await axios.get(DEVB_ROUTE + `/api/articles/${slug}`);
                    setContent(response.data);
                    setTrait(response.data.trait);
                } catch (err) {
                    setError('Article non trouvé');
                }
            };

            fetchUpdatedArticle();
        }
    }, [navigate.state?.updated, slug]);

    if (loading) return <Loading />;

    if (error) {
        return <Error404 />;
    }

    return (
        <>
            {slug && (
                <div className="flex flex-row h-full items-center justify-center p-4">
                    <div className="flex flex-col relative bg-gradient-to-r from-gray-900 via-blue-950 to-gray-700 w-3/4 h-4/5 p-6 rounded-xl shadow-2xl text-white z-30">
                        <div className="absolute right-4 top-4">
                            <button
                                onClick={() => setShowComments(!showComments)}
                                className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition duration-300 transform hover:scale-105"
                            >
                                <FaComment />
                            </button>
                        </div>
                        <h1 className="text-5xl font-extrabold mb-6">{content?.title}</h1>
                        <p className="text-2xl font-medium mb-4">{content?.categoryName}</p>
                        <div className="custom-content overflow-y-auto max-h-full text-lg leading-relaxed text-gray-200" dangerouslySetInnerHTML={{ __html: content?.content }} />
                    </div>

                    {showComments && <Comments articleId={content?.id} />}
                </div>
            )}
        </>
    );
};

export default HomePage;
