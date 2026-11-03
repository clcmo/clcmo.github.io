import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITE } from '../config/env';
import { mask } from '../utils/assets';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="topo">
      <Link className="topo__marca" to="/" onClick={close} aria-label="Camila L. Oliveira — página inicial">
        <span className="monograma" role="img" aria-hidden="true" style={mask('/img/monograma-ca.svg')} />
      </Link>
      <button className="topo__menu" type="button" aria-expanded={open} aria-controls="menu-principal" onClick={() => setOpen(!open)}>
        <span className="sr">{open ? 'Fechar menu' : 'Abrir menu'}</span><i aria-hidden="true" />
      </button>
      <nav id="menu-principal" className="menu" aria-label="Menu principal" hidden={!open}>
        <ul>
          <li><NavLink to="/" end onClick={close}>Início</NavLink></li>
          <li><NavLink to="/projetos" onClick={close}>Projetos</NavLink></li>
          <li><a href={`${SITE}/livros/`} target="_blank" rel="noopener">Livros</a></li>
          <li><a href={`${SITE}/sobre/`} target="_blank" rel="noopener">Sobre</a></li>
          <li><a href={`${SITE}/blog/`} target="_blank" rel="noopener">Blog</a></li>
          <li><a href={`${SITE}/contato/`} target="_blank" rel="noopener">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}
