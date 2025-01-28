import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaTimes, FaHome, FaMap, FaBookOpen, FaList } from 'react-icons/fa';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    // Gestion du scroll pour le header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Header fixe */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-gray-900'
                }`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                            <span className="font-bold text-xl text-white hidden sm:block">Evralia</span>
                        </Link>

                        {/* Navigation principale desktop */}
                        <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                            <Link to="/" className="text-white hover:text-blue-400 flex items-center gap-2">
                                <FaHome /> Accueil
                            </Link>
                            <Link to="/map" className="text-white hover:text-blue-400 flex items-center gap-2">
                                <FaMap /> Carte
                            </Link>
                            <Link to="/articles" className="text-white hover:text-blue-400 flex items-center gap-2">
                                <FaBookOpen /> Articles
                            </Link>
                            <Link to="/categories" className="text-white hover:text-blue-400 flex items-center gap-2">
                                <FaList /> Catégories
                            </Link>
                        </nav>

                        {/* Barre de recherche et authentification */}
                        <div className="flex items-center space-x-4">
                            {/* Barre de recherche */}
                            <div className="hidden md:flex items-center relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="bg-gray-800/80 text-white px-4 py-2 rounded-full w-48 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute right-4 text-gray-400" />
                            </div>

                            {/* Authentification */}
                            <div className="hidden md:flex items-center space-x-4">
                                {isLoggedIn && isAdmin && (
                                    <Link to="/admin" className="hover:text-blue-400">
                                        Admin
                                    </Link>
                                )}
                                {isLoggedIn ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                localStorage.removeItem('user');
                                                navigate('/login');
                                            }}
                                            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 
                             transition-colors duration-300"
                                        >
                                            Déconnexion
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-white hover:text-blue-400">
                                            Connexion
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 
                             transition-colors duration-300"
                                        >
                                            Inscription
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Bouton menu mobile */}
                            <button
                                className="md:hidden text-white p-2"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <FaBars size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar mobile */}
            <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isSidebarOpen ? 'visible' : 'invisible'
                }`}>
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-0'
                        }`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar */}
                <div className={`absolute top-0 right-0 w-64 h-full bg-gray-900 transform transition-transform 
                        duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-white">Menu</h2>
                            <button onClick={() => setIsSidebarOpen(false)}>
                                <FaTimes className="text-white" size={24} />
                            </button>
                        </div>

                        {/* Recherche mobile */}
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Navigation mobile */}
                        <nav className="flex flex-col space-y-4">
                            <Link to="/" className="text-white hover:text-blue-400 flex items-center gap-3">
                                <FaHome /> Accueil
                            </Link>
                            <Link to="/map" className="text-white hover:text-blue-400 flex items-center gap-3">
                                <FaMap /> Carte
                            </Link>
                            <Link to="/articles" className="text-white hover:text-blue-400 flex items-center gap-3">
                                <FaBookOpen /> Articles
                            </Link>
                            <Link to="/categories" className="text-white hover:text-blue-400 flex items-center gap-3">
                                <FaList /> Catégories
                            </Link>

                            {/* Auth mobile */}
                            <div className="pt-4 border-t border-gray-700">
                                {isLoggedIn && isAdmin && (
                                    <Link to="/admin" className="block text-white hover:text-blue-400 py-2">
                                        Admin
                                    </Link>
                                )}
                                {isLoggedIn ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                localStorage.removeItem('user');
                                                navigate('/login');
                                                setIsSidebarOpen(false);
                                            }}
                                            className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 mt-2"
                                        >
                                            Déconnexion
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <Link
                                            to="/login"
                                            className="text-white hover:text-blue-400 text-center py-2"
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 text-center"
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            Inscription
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
