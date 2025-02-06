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
import MapChart from './pages/MapChart';
import 'leaflet/dist/leaflet.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import CategoryManager from './admin/pages/CategoryManager';
import UserManager from './admin/pages/UserManager';
import ArticleManager from './admin/pages/ArticleManager';
import CreateArticle from './admin/pages/CreateArticle';
import EditArticle from './admin/pages/EditArticle';
import CreateCategory from './admin/pages/CreateCategory';
import EditCategory from './admin/pages/EditCategory';
import './styles/editor.css';
import Dashboard from './admin/pages/Dashboard';
import LegalPage from './pages/LegalPage';
import PrivacyPage from './pages/PrivacyPage';
import MapManager from './admin/pages/MapManager';

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
    <div className={`flex flex-col h-min-screen ${getBackgroundClass(trait)} bg-center bg-no-repeat bg-cover z-0 prose`}>
      <BrowserRouter>
        <Routes>
          {/* Routes Admin */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="articles" element={<ArticleManager />} />
                  <Route path="articles/new" element={<CreateArticle />} />
                  <Route path="articles/edit/:id" element={<EditArticle />} />
                  <Route path="categories" element={<CategoryManager />} />
                  <Route path="categories/new" element={<CreateCategory />} />
                  <Route path="categories/edit/:id" element={<EditCategory />} />
                  <Route path="users" element={<UserManager />} />
                  <Route path="maps" element={<MapManager />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />

          {/* Routes principales */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex flex-col w-full h-screen pt-16">
                <Routes>
                  <Route path="/" element={<Navigate to="/evralia" />} />
                  <Route path="/map" element={<MapChart />} />
                  <Route path="/articles" element={<AllArticlesPage />} />
                  <Route path="/categories" element={<AllCategoriesPage />} />
                  <Route path="/add-page" element={
                    <ProtectedRoute>
                      <AddPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/edit/:slug" element={
                    <ProtectedRoute>
                      <EditPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/add-category" element={
                    <ProtectedRoute>
                      <AddCategory />
                    </ProtectedRoute>
                  } /> 
                  <Route path="/categories/:id" element={<CategoryPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/legal" element={<LegalPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/:slug" element={<HomePage setTrait={setTrait} />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
