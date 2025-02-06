import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-secondary bg-slate-900 flex flex-col h-[calc(100vh-4rem)]">
      <div className="overflow-y-auto flex-1 pr-4">
        <h1 className="text-4xl font-bold mb-6 sticky top-0 bg-slate-900 py-2 z-10">
          Politique de confidentialité
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Données de connexion (adresse email)</li>
            <li>Données de profil (nom d'utilisateur)</li>
            <li>Cookies techniques essentiels</li>
          </ul>
          <p>Ces données sont collectées automatiquement ou lorsque vous les fournissez en utilisant notre site.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Gérer votre compte et vos préférences</li>
            <li>Améliorer votre expérience utilisateur</li>
            <li>Assurer la sécurité et le bon fonctionnement du site</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Partage des données</h2>
          <p>Nous ne partageons pas vos données avec des tiers, sauf dans les cas suivants :</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Obligation légale</li>
            <li>Protection de nos droits</li>
            <li>Utilisation de services tiers pour l'hébergement</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Droit d'accès, de rectification et de suppression de vos données</li>
            <li>Droit d'opposition et de limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
          </ul>
          <p>Pour exercer vos droits, vous pouvez nous contacter à : <a href="mailto:contact@kevinlamotte.fr" className="text-blue-400">contact@kevinlamotte.fr</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
          <p>Ce site utilise les types de cookies suivants :</p>
          <ul className="list-disc ml-6 mt-2">
            <li><strong>Cookies techniques essentiels :</strong> nécessaires au bon fonctionnement du site.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
