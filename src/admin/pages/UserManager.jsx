import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DEVB_ROUTE } from '../../routes/Routes';
import { FaEdit, FaTrash, FaUserLock, FaUserCheck } from 'react-icons/fa';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${DEVB_ROUTE}/api/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`${DEVB_ROUTE}/api/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors du changement de rôle:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`${DEVB_ROUTE}/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Utilisateurs</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {user.role !== 'admin' ? (
                    <button
                      onClick={() => handleRoleChange(user.id, 'admin')}
                      className="text-blue-600 hover:text-blue-900"
                      title="Promouvoir en admin"
                    >
                      <FaUserLock />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user.id, 'user')}
                      className="text-green-600 hover:text-green-900"
                      title="Rétrograder en utilisateur"
                    >
                      <FaUserCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900 ml-4"
                    title="Supprimer l'utilisateur"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
