import { GetStaticPaths, GetStaticProps } from 'next';
import { getGlobalData, getPageData, getAllArticles, getArticleBySlug } from 'lib/api';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from 'components/layout/Layout';
import Sections from 'components/sections';

export default function DynamicPage({ globalData, pageData }) {
  const router = useRouter()

  if (!router.isFallback && !pageData?.sections.length) {
    return <ErrorPage statusCode={404} />;
  }

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout 
      metadata={pageData.metadata}
      globalData={globalData}
    >
      <Sections sections={pageData.sections} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const articles = await getAllArticles('en', ['slug'])
  const paths = articles.map(article => ({
    params: { slug: article.slug }
  }))

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params

  const article = getArticleBySlug(
    locale,
    slug, 
    [
      'title',
      'description',
      'date',
      'slug',
      'content',
      'coverImage',
      'category',
      'author',
      'minReading'
    ]
  )

  const relatedArticles = getAllArticles(
    locale,
    [
      'title',
      'description',
      'coverImage',
      'slug',
      'content',
      'date',
      'category',
      'author',
      'minReading'
    ],
    article.category.toLowerCase()
  ).filter(article => article.slug !== slug)

  const articlesCarouselTitle = {
    en: "Let's continue",
    fr: "On continue?"
  }

  const pageData = {
    metadata: {
      metaTitle: "metaTitle from CMS",
      metaDescription: "metaDescription from CMS"
    },
    sections: [
      {
        template: 'article',
        article
      },
      {
        template: 'articles-carousel',
        articles: relatedArticles,
        title: articlesCarouselTitle[locale],
        layerStyles: { dark: 'greyDark', light: 'greyLight' }
      }
    ]
  }

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  const globalData = await getGlobalData(locale)

  return {
    props: {
      globalData,
      pageData
    }
  }
}