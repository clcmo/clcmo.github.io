import Head from "expo-router/head";

const SITE_DATA = {
    url: 'https://dev.camilaloliveira.me',
    title: 'Camila L. Oliveira | Full Stack + Professora',
    description: 'Portfólio de Camila L. Oliveira — projetos, tecnologias e contato. Desenvolvimento web e mobile com foco em UX.',
    ogImage: './og-image.png',
    twitterHandle: '@millaloliveira',
    github: '@clcmo',
}

export function Header() {
    return (
        <Head>
        {/* Básico */}
        <title>{SITE_DATA.title}</title>
        <meta name="description" content={SITE_DATA.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a192f" />

        {/* Canonical */}
        <link rel="canonical" href={SITE_DATA.url} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Camila L. Oliveira" />
        <meta property="og:title" content={SITE_DATA.title} />
        <meta property="og:description" content={SITE_DATA.description} />
        <meta property="og:url" content={SITE_DATA.url} />
        <meta property="og:image" content={SITE_DATA.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Portfólio de Camila L. Oliveira" />
        <meta property="og:type" content="website"></meta>

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_DATA.title} />
        <meta name="twitter:description" content={SITE_DATA.description} />
        <meta name="twitter:image" content={SITE_DATA.ogImage} />

        {/* Opcional: se você tiver @ no Twitter/X */}
        <meta name="twitter:site" content={SITE_DATA.twitterHandle} />
        <meta name="twitter:creator" content={SITE_DATA.twitterHandle} />
      </Head>
    );
}