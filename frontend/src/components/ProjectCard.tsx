import { projectMeta, type Project } from '../models/Project';

export function ProjectCard({ project: p }: { project: Project }) {
  const href = p.homepage || p.htmlUrl;
  return (
    <li className="projeto">
      <a
        className={p.coverUrl ? 'projeto__capa' : 'projeto__capa projeto__capa--texto'}
        href={href}
        target="_blank"
        rel="noopener"
        tabIndex={-1}
        aria-hidden="true"
      >
        {p.coverUrl ? <img src={p.coverUrl} alt="" loading="lazy" /> : p.name}
      </a>
      <h2 className="projeto__nome">
        <a href={href} target="_blank" rel="noopener">{p.name}</a>
      </h2>
      {projectMeta(p) && <p className="projeto__meta">{projectMeta(p)}</p>}
      {p.description && <p className="projeto__descricao">{p.description}</p>}
      <div className="projeto__links">
        <a className="projeto__cta" href={p.htmlUrl} target="_blank" rel="noopener">Código</a>
        {p.homepage && (
          <a className="projeto__cta projeto__cta--contorno" href={p.homepage} target="_blank" rel="noopener">Ver ao vivo</a>
        )}
      </div>
    </li>
  );
}
