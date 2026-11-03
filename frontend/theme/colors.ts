// Tokens do tema camilaloliveira.com (espelham :root do theme.css).
const papel = '#ffffff';
const linho = '#f1e7db';
const texto = '#1d1b19';
const preto = '#000000';
const marca = '#5b5348';
const brilho = '#c9a97a';
const fio = '#1d1b19';
const campo = '#fcfcfc';
const campoBorda = '#dcdcdc';

export const colors = {
  // --- tokens do tema ---
  papel,
  linho,
  texto,
  preto,
  marca,
  brilho,
  fio,
  campo,
  campoBorda,

  // --- nomes usados pelo restante do app (apontam para os tokens acima) ---
  bg: papel,
  surface: linho,
  border: campoBorda, // linhas sutis; use `fio` para linhas pretas
  text: texto,
  textMuted: '#4a453f',
  primary: preto, // sempre #rrggbb: alguns estilos fazem `${colors.primary}1A`

  // --- apoio / gráficos (tons terrosos, combinam com o tema) ---
  blue: '#4f6d7a',
  blueMoon: '#6d5b7a',
  orange: '#b5651d',
  green: '#6b7f5e',
  pink: '#a05a6c',
  cyan: '#4f7f8a',

  white: '#ffffff',
  danger: '#9b2c2c',
};

export const statsColors = [
  colors.marca,
  colors.brilho,
  colors.blue,
  colors.orange,
  colors.green,
  colors.pink,
  colors.blueMoon,
  colors.cyan,
];
