import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaGithub, FaLinkedin, FaBlog } from 'react-icons/fa';
import './Header.scss';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1>Camila L. Oliveira</h1>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/projects" className="header__link">Projetos</Link>
          <Link to="/about" className="header__link">Sobre</Link>
          <Link to="/contact" className="header__link">Contato</Link>
        </nav>

        <div className="header__actions">
          <a 
            href="https://github.com/clcmo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header__social"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          
          <a 
            href="https://linkedin.com/in/clcmo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header__social"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          
          <a 
            href="https://apprendendo.blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header__social"
            aria-label="Blog"
          >
            <FaBlog />
          </a>

          <button 
            onClick={toggleTheme} 
            className="header__theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
