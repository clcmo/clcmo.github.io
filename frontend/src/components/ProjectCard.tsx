import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { FaStar, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ProjectCard.scss';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="project-card__header">
        <div className="project-card__icon">
          <i className={project.faicon}></i>
        </div>
        
        {project.featured && (
          <span className="project-card__badge">Destaque</span>
        )}
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="project-card__tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="project-card__tag">+{project.tags.length - 3}</span>
          )}
        </div>

        <div className="project-card__meta">
          {project.language && (
            <span className="project-card__language">
              <span className="language-dot" style={{ backgroundColor: getLanguageColor(project.language) }}></span>
              {project.language}
            </span>
          )}
          
          {project.stars > 0 && (
            <span className="project-card__stars">
              <FaStar /> {project.stars}
            </span>
          )}
        </div>
      </div>

      <div className="project-card__footer">
        <div className="project-card__links">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label="View on GitHub"
            >
              <FaGithub /> GitHub
            </a>
          )}
          
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-card__link project-card__link--primary"
            aria-label="View project"
          >
            <FaExternalLinkAlt /> Ver Projeto
          </a>
        </div>

        <Link 
          to={`/projects/${project.slug}`} 
          className="project-card__details"
        >
          Detalhes →
        </Link>
      </div>
    </motion.div>
  );
};

// Helper function para cores de linguagem (estilo GitHub)
const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Kotlin': '#A97BFF',
    'PHP': '#4F5D95',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'SCSS': '#c6538c',
    'React': '#61dafb',
  };
  
  return colors[language] || '#8b949e';
};

export default ProjectCard;
