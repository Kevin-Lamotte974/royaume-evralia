import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaNewspaper, FaFolderOpen, FaUsers, FaMap } from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/admin') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaHome /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/articles"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/admin/articles') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaNewspaper /> <span>Articles</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/admin/categories') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaFolderOpen /> <span>Catégories</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/admin/users') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaUsers /> <span>Utilisateurs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/maps"
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/admin/maps') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaMap /> <span>Cartes</span>
            </Link>
          </li>
        </ul>
      </nav>
      <img src="/logo.png" alt="Logo" className="absolute bottom-24 left-8 h-48 w-48 invert" />
    </aside>
  );
};

export default AdminSidebar;
