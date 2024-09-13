import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

const MapChart = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/evralia2.geojson')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading geojson:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handlePolygonClick = (cours) => {
    const formattedCours = cours
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '-');
  
    navigate(`/${formattedCours}`);
  };
  

  const getColorByCours = (cours) => {
    switch (cours.toLowerCase()) {
      case 'la cour des brumes':
        return 'gray';
      case 'la cour du feu':
        return 'orange';
      case 'la cour des forêts':
        return 'green';
      case 'la cour des glaces':
        return 'white';
      case 'la cour des mers':
        return 'blue';
      case "la cour de l'aube":
        return 'yellow';
      default:
        return 'black';
    }
  };

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>Error loading map: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <div className="relative bg-gray-900 w-3/4 h-4/5 p-4 rounded-lg text-secondary">
        <MapContainer
          center={[0, 0]} // Centré sur le centre du monde
          zoom={2} // Vue globale de la carte
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          zoomControl={true}
        >
          <TileLayer
            url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=c4T1cTXKzYZ4gBDiZcvW"
            attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geoData &&
            geoData.features.map((feature, i) => {
              if (feature.geometry.type === "Polygon") {
                const coordinates = feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
                const color = getColorByCours(feature.properties.cours);
                return (
                  <Polygon
                    key={i}
                    positions={coordinates}
                    pathOptions={{ color: color }}
                    eventHandlers={{
                      click: () => handlePolygonClick(feature.properties.cours),
                    }}
                  >
                    <Popup>
                      <div>
                        <strong>{feature.properties.région}</strong>
                        <br />
                        Cours: {feature.properties.cours}
                      </div>
                    </Popup>
                    <Tooltip>
                      <div>
                        <strong>{feature.properties.région}</strong>
                        <br />
                        Cours: {feature.properties.cours}
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              } else {
                console.warn('Unsupported geometry type:', feature.geometry.type);
                return null;
              }
            })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapChart;
