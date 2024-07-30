import React, { useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import AddCategory from './pages/AddCategory';
import AllArticlesPage from './pages/AllArticlesPage';
import AllCategoriesPage from './pages/AllCategoriesPage';
import CategoryPage from './pages/CategoryPage';

const App = () => {
  const [trait, setTrait] = useState('Neutre');

  const getBackgroundClass = (trait) => {
    switch (trait) {
      case 'Vie':
        return 'bg-vie';
      case 'Néant':
        return 'bg-néant';
      default:
        return 'bg-neutre';
    }
  };

  return (
    <div className={`flex w-screen h-screen ${getBackgroundClass(trait)} bg-center bg-no-repeat bg-cover z-0`}>
      <BrowserRouter>
        <Header />
        <main className="flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/accueil" />} />
            <Route path="/articles" element={<AllArticlesPage />} />
            <Route path="/categories" element={<AllCategoriesPage />} />
            <Route path="/add-page" element={<AddPage />} />
            <Route path="/edit/:slug" element={<EditPage />} />
            <Route path="/add-category" element={<AddCategory />} /> 
            <Route path="/categories/:id" element={<CategoryPage />} />
            <Route path="/:slug" element={<HomePage setTrait={setTrait} />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
