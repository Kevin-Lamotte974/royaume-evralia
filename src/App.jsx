import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

const App = () => {
  return (
    <div className='flex w-screen h-screen bg-night-forest bg-center bg-no-repeat bg-cover z-0'>
      <BrowserRouter>
        <Header />
        <main className="flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/accueil" />} />
            <Route path="/add-page" element={<AddPage />} />
            <Route path="/edit/:slug" element={<EditPage />} />
            <Route path="/:slug" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
