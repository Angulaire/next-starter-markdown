import { GetStaticProps } from 'next';
import { getGlobalData, getAllArticles } from 'lib/api';
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
  const pageData = {
    metadata: {
      metaTitle: "metaTitle from CMS",
      metaDescription: "metaDescription from CMS"
    },
    sections: [
      {
        template: 'articles-search',
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