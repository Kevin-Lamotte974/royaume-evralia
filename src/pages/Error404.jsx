import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
            <div className="bg-secondary px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button className="mt-5">
                <Link to="/accueil" className="relative inline-block text-sm font-medium text-secondary group focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary group-hover:translate-y-0 group-hover:translate-x-0"></span>
                    <span className="relative block px-8 py-3 bg-primary border border-current">
                        Accueil
                    </span>
                </Link>
            </button>
        </div>
    );
}

export default Error404;
