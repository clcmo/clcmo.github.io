import type { CSSProperties } from 'react';

export const asset = (path: string) => `${process.env.PUBLIC_URL ?? ''}${path}`;

/** A marca e o monograma do tema usam máscara CSS via --mascara. */
export const mask = (path: string) =>
  ({ ['--mascara' as string]: `url(${asset(path)})` }) as CSSProperties;
