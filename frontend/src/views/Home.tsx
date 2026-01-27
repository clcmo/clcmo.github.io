import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaCode } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import { projectsAPI } from '../services/api';
import { Project } from '../types';
import './Home.scss';

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    try {
      const projects = await projectsAPI.getAll({ featured: true });
      setFeaturedProjects(projects.slice(0, 6));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero__title">
              Olá, eu sou <br />
              <span className="gradient-text">Camila L. Oliveira</span>
            </h1>
            
            <p className="hero__subtitle">
              Desenvolvedora Full Stack | Professora | Matemática
            </p>
            
            <p className="hero__description">
              Apaixonada por tecnologia, educação e transformação digital. 
              Criando soluções inovadoras e compartilhando conhecimento.
            </p>

            <div className="hero__actions">
              <Link to="/projects" className="btn btn--primary">
                Ver Projetos <FaArrowRight />
              </Link>
              
              <a 
                href="https://github.com/clcmo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn--secondary"
              >
                <FaGithub /> GitHub
              </a>
            </div>

            <div className="hero__stats">
              <div className="stat">
                <FaCode />
                <div>
                  <h3>5+</h3>
                  <p>Anos de Experiência</p>
                </div>
              </div>
              
              <div className="stat">
                <FaGithub />
                <div>
                  <h3>52</h3>
                  <p>Repositórios</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero__image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Adicione uma imagem ou ilustração aqui */}
            <div className="hero__illustration">
              <div className="floating-element"></div>
              <div className="floating-element"></div>
              <div className="floating-element"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects py-5">
        <div className="container">
          <div className="section-header">
            <h2>Projetos em Destaque</h2>
            <Link to="/projects" className="view-all">
              Ver todos <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          ) : (
            <div className="grid grid--3">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview py-5">
        <div className="container">
          <motion.div
            className="about-preview__content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Sobre Mim</h2>
            <p>
              Trabalho com desenvolvimento desde 2019, desenvolvendo features para Itaú e PagBank. 
              Tenho pós-graduação em Inteligência Artificial pela PUC-SP e atuo como professora 
              em tecnologias na ETEC Bartolomeu e ETEC Ermelinda.
            </p>
            <Link to="/about" className="btn btn--outline">
              Saiba Mais <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
