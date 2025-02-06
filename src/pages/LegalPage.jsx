import React from 'react';

const LegalPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-secondary bg-slate-900 h-full">
      <h1 className="text-4xl font-bold mb-6">Mentions légales</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Édition du site</h2>
        <p>Le site Evralia est édité par Kevin LAMOTTE</p>

        <p>Contact : <a href="mailto:contact@kevinlamotte.fr">contact@kevinlamotte.fr</a></p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Hébergement</h2>
        <p>Le front du site est hébergé par Netlify.</p>
        <p>Le back du site est hébergé par LWS.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site est protégé par le droit d'auteur.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Protection des données personnelles</h2>
        <p>Les informations collectées sur ce site sont destinées exclusivement à l'éditeur.</p>
        <p>Conformément au RGPD, vous pouvez exercer vos droits en envoyant un e-mail à <a href="mailto:contact@kevinlamotte.fr">contact@kevinlamotte.fr</a>.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
        <p>Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun suivi publicitaire ou analytique n'est effectué.</p>
      </section>
    </div>
  );
};

export default LegalPage;
