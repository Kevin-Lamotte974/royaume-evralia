import React, { useState } from 'react';
import axios from 'axios';
import { setPassword } from '../utils/password';

const PasswordPrompt = ({ onPasswordSet }) => {
  const [password, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/check-password', { password });
      if (response.data.success) {
        setPassword(password);
        onPasswordSet(password);
      } else {
        setError('Mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du mot de passe:', err);
      setError('Erreur lors de la vérification du mot de passe');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg flex flex-col items-center justify-center text-secondary">
        <h1 className="text-4xl font-bold mb-4">Enter Password</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;
