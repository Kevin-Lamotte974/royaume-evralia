import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KeyboardListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'm' || event.key === 'M') {
        navigate('/map');
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default KeyboardListener;
