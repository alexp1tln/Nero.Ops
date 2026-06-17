import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Neuro.Ops — B2B Автоматизация',
  description = 'Разработка веб-приложений и интеграция ИИ для бизнеса от Neuro.Ops. Мы помогаем автоматизировать процессы и внедрять ИИ агентов.',
  image = 'https://i.postimg.cc/fL5GvPxW/4cdce90d89fdbd80eebefb2c59decedd.png',
  url = 'https://neuro-ops.ru/',
  type = 'website'
}: SEOProps) {
  const siteName = 'Neuro.Ops';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
