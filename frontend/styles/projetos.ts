import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

const c = colors;
const f = fonts;

// Mesma linguagem da loja do tema: quadrado de capa, nome em caixa-alta sublinhado,
// botões retos preto/contorno, filtros com borda fina.
export const projetos = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: 24,
    rowGap: 12,
    marginBottom: 32,
  },
  resultado: {
    fontFamily: f.sans,
    fontSize: 13.6,
    lineHeight: 19,
    color: c.textMuted,
    flexShrink: 0,
  },

  filtros: {
    flex: 1,
    minWidth: 0,
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  filtroRotulo: { fontFamily: f.sansBold, fontSize: 12.8, textTransform: 'uppercase', color: c.text, marginRight: 4 },
  filtro: {
    minHeight: 40,
    maxWidth: '100%',
    flexShrink: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.fio,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  filtroAtivo: { backgroundColor: c.preto },
  filtroTexto: {
    maxWidth: '100%',
    flexShrink: 1,
    fontFamily: f.sans,
    fontSize: 13,
    color: c.text,
    textAlign: 'center',
  },
  filtroTextoAtivo: { color: c.bg },

  paginacao: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  paginacaoBotao: {
    minWidth: 40,
    minHeight: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.fio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginacaoBotaoAtivo: { backgroundColor: c.preto, borderColor: c.preto },
  paginacaoBotaoDesabilitado: { opacity: 0.4 },
  paginacaoTexto: { fontFamily: f.sans, fontSize: 13, color: c.text },
  paginacaoTextoAtivo: { color: c.bg },

  estado: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: c.preto,
    backgroundColor: c.surface,
    marginBottom: 24,
  },
  estadoTexto: { fontFamily: f.sans, fontSize: 15, lineHeight: 22, color: c.text },

  grid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 28, rowGap: 40, alignItems: 'flex-start' },

  capa: {
    aspectRatio: 1,
    width: '100%',
    backgroundColor: c.surface,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capaImagem: { width: '100%', height: '100%' },
  capaTexto: {
    padding: 20,
    fontFamily: f.sansBold,
    fontSize: 18,
    lineHeight: 22,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: c.marca,
  },

  nome: {
    fontFamily: f.sansBold,
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'uppercase',
    color: c.text,
    textDecorationLine: 'underline',
  },
  meta: { fontFamily: f.serif, fontSize: 15.7, lineHeight: 24, color: c.textMuted, marginTop: 4 },
  descricao: { fontFamily: f.serif, fontSize: 15.7, lineHeight: 24, color: c.text, marginTop: 8 },

  links: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  cta: {
    minHeight: 42,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTexto: { fontFamily: f.sansBold, fontSize: 13, textTransform: 'uppercase' },
});
