import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";

const MapManager = () => {
  const [maps, setMaps] = useState([]);
  const [newMapData, setNewMapData] = useState({
    name: '',
    text: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingMap, setEditingMap] = useState(null);

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    try {
      const response = await axiosInstance.get('/api/maps');
      setMaps(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des maps');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedJson = JSON.parse(newMapData.text);
      
      await axiosInstance.post('/api/maps', {
        name: newMapData.name,
        text: parsedJson
      });
      
      setNewMapData({ name: '', text: '' });
      fetchMaps();
    } catch (error) {
      setError(error instanceof SyntaxError ? 'JSON invalide' : 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (map) => {
    setEditingMap(map);
    setNewMapData({
      name: map.name,
      text: JSON.stringify(map.text, null, 2)
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedJson = JSON.parse(newMapData.text);
      
      await axiosInstance.put(`/api/maps/${editingMap.id}`, {
        name: newMapData.name,
        text: parsedJson
      });
      
      setNewMapData({ name: '', text: '' });
      setEditingMap(null);
      fetchMaps();
    } catch (error) {
      setError(error instanceof SyntaxError ? 'JSON invalide' : 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingMap(null);
    setNewMapData({ name: '', text: '' });
    setError('');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Cartes</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingMap ? 'Modifier la carte' : 'Ajouter une nouvelle carte'}
        </h2>
        <form onSubmit={editingMap ? handleUpdate : handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la carte
            </label>
            <input
              type="text"
              value={newMapData.name}
              onChange={(e) => setNewMapData({ ...newMapData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <textarea
            value={newMapData.text}
            onChange={(e) => setNewMapData({ ...newMapData, text: e.target.value })}
            className="w-full h-64 p-2 border rounded-md font-mono"
            placeholder="Collez votre JSON ici..."
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : editingMap ? 'Modifier' : 'Créer'}
            </button>
            {editingMap && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Cartes existantes</h2>
        {maps.map((map) => (
          <div key={map.id} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{map.name}</h3>
              <button
                onClick={() => handleEdit(map)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
            </div>
            <pre className="p-4 bg-gray-100 rounded-md overflow-auto">
              {JSON.stringify(map.text, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapManager;