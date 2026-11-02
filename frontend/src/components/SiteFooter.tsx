import { Link } from 'react-router-dom';
import { SITE } from '../config/env';
import { mask } from '../utils/assets';

export function SiteFooter() {
  return (
    <footer className="rodape">
      <div className="rodape__nav">
        <nav aria-label="Menu do rodapé">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/projetos">Projetos</Link></li>
            <li><a href={`${SITE}/blog/`} target="_blank" rel="noopener">Blog</a></li>
            <li><a href={`${SITE}/sobre/`} target="_blank" rel="noopener">Sobre</a></li>
            <li><a href={`${SITE}/contato/`} target="_blank" rel="noopener">Contato</a></li>
          </ul>
        </nav>
      </div>
      <p className="marca marca--rodape">
        <span className="marca__arte" aria-hidden="true" style={mask('/img/marca-camila.svg')} />
        <span className="marca__texto">Camila L. Oliveira</span>
      </p>
      <p className="rodape__copy">© {new Date().getFullYear()}. Camila L. Oliveira. Todos os direitos reservados.</p>
    </footer>
  );
}
