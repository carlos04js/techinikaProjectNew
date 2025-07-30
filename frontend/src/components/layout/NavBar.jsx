// frontend/src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Car } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Veículos", path: "/cars" },
    { name: "Busca", path: "/busca" },
    { name: "Serviços", path: "/servicos" },
    { name: "Contato", path: "/contato" },
    { name: "Login", path: "/login" },
    { name: "Registrar", path: "/register" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-technika-dark shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-technika-blue dark:text-technika-lightBlue" />
          <span className="font-montserrat font-bold text-xl md:text-2xl text-technika-blue dark:text-white">
            Technika<span className="text-technika-lightBlue">Automotiva</span>
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium text-sm transition-colors ${
                isActive(item.path)
                  ? "text-technika-blue dark:text-technika-lightBlue"
                  : "text-gray-600 dark:text-gray-300 hover:text-technika-blue dark:hover:text-technika-lightBlue"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Botão "Fale Conosco" */}
          <Link
            to="/contato"
            className="px-4 py-2 bg-technika-blue text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Fale Conosco
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-technika-dark border-t border-gray-100 dark:border-gray-800 py-4 animate-fade-in">
          <div className="container mx-auto px-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-technika-blue dark:text-technika-lightBlue"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/contato"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-4 py-2 bg-technika-blue text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;