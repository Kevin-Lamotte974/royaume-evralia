import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white h-16 fixed w-full z-50">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/admin" className="text-xl font-bold">
            Administration Evralia
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-400">
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
