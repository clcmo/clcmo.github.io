import { GITHUB_USER } from '../config/env';
import { useProjectsController } from '../controllers/useProjectsController';
import { ProjectCard } from '../components/ProjectCard';

export function ProjetosView() {
  const { visible, languages, language, setLanguage, status } = useProjectsController();
  const total = visible.length;

  return (
    <main id="conteudo" className="conteudo">
      <section className="projetos" aria-labelledby="titulo-projetos">
        <h1 id="titulo-projetos" className="titulo-pagina">Projetos</h1>

        <div className="projetos__toolbar">
          <p className="projetos__resultado" role="status">
            {status === 'ready' ? `${total} ${total === 1 ? 'projeto' : 'projetos'}` : '\u00a0'}
          </p>
          {languages.length > 1 && (
            <div className="projeto-filtros" role="group" aria-label="Filtrar por linguagem">
              <span className="projeto-filtros__rotulo">Linguagem</span>
              <button className="projeto-filtro" type="button" aria-pressed={language === null} onClick={() => setLanguage(null)}>Todos</button>
              {languages.map((l) => (
                <button key={l} className="projeto-filtro" type="button" aria-pressed={language === l} onClick={() => setLanguage(l)}>{l}</button>
              ))}
            </div>
          )}
        </div>

        {status === 'loading' && <p className="projetos__estado" role="status">Carregando projetos…</p>}
        {status === 'error' && <p className="projetos__estado" role="alert">Não foi possível carregar os projetos. Tente de novo em instantes.</p>}
        {status === 'ready' && total === 0 && <p className="projetos__estado">Nenhum projeto com esse filtro.</p>}

        <ul className="projetos__lista">
          {visible.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </ul>

        <p className="projetos__rodape">
          <a className="vitrine__ver" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener">
            Ver todos no GitHub <span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>
    </main>
  );
}
