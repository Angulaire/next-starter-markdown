import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';

export default function Seo({ title, description, author, coverImage, datePublished, dateModified }) {
  const { locale, asPath } = useRouter()
  return (
    <>
      <NextSeo
        openGraph={{
          article: {
            publishedTime: datePublished,
            modifiedTime: dateModified,
            tags: ['Tech'],
          },
          images: [{ url: coverImage }]
        }}
      />
      <ArticleJsonLd
        url={`https://angulaire.io/${locale + asPath}`}
        title={title}
        description={description}
        images={[coverImage]}
        datePublished={datePublished}
        dateModified={dateModified}
        authorName={[author.name]}
        publisherName={author.name}
        publisherLogo={author.avatar}
      />
    </>
  )
}