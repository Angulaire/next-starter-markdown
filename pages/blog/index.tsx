import { GetStaticProps } from 'next';
import { getGlobalData, getAllArticles, getPageData } from 'lib/api';
import Layout from 'components/layout/Layout';
import Sections from 'components/layout/Sections';

export default function BlogPage({ globalData, pageData }) {
  return (
    <Layout 
      metadata={pageData.metadata}
      globalData={globalData}
    >
      <Sections sections={pageData.sections} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

  const articles = getAllArticles(
    locale,
    [
      'title',
      'description',
      'coverImage',
      'slug',
      'content',
      'date',
      'category',
      'author'
    ]
  )
  const { metadata, categories } = getPageData(locale, 'blog')

  const pageData = {
    metadata,
    sections: [
      {
        template: 'articles-search',
        categories,
        articles
      },
      {
        template: 'articles-grid',
        articles
      }
    ]
  }

  const globalData = await getGlobalData(locale)

  return {
    props: {
      globalData,
      pageData
    }
  }
}