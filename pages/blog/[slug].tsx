import { GetStaticPaths, GetStaticProps } from 'next';
import { getGlobalData, getPageData, getAllArticles, getArticleBySlug } from 'lib/api';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from 'components/layout/Layout';
import Sections from 'components/layout/Sections';

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
      'date',
      'slug',
      'content',
      'coverImage',
      'category',
      'author'
    ]
  )

  const pageData = {
    metadata: {
      metaTitle: "metaTitle from CMS",
      metaDescription: "metaDescription from CMS"
    },
    sections: [
      {
        template: 'article',
        article
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