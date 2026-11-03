// Paleta escura do tema camilaloliveira.com.
const papel = '#171615';
const linho = '#24211e';
const texto = '#f1e7db';
const preto = '#f1e7db';
const marca = '#d2bd9c';
const brilho = '#c9a97a';
const fio = '#655d54';
const campo = '#24211e';
const campoBorda = '#514a42';

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
  textMuted: '#b9afa2',
  primary: preto, // sempre #rrggbb: alguns estilos fazem `${colors.primary}1A`

  // --- apoio / gráficos (tons terrosos, combinam com o tema) ---
  blue: '#8fb1c0',
  blueMoon: '#b7a1cc',
  orange: '#e2a36f',
  green: '#a8bd91',
  pink: '#d99aaa',
  cyan: '#8fc5ce',

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
