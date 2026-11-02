import { Outlet } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function Layout() {
  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
