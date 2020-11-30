import { GetServerSideProps } from 'next';
import { getGlobalData, getAllArticles, getPageData } from 'lib/api';
import Layout from 'components/layout/Layout';
import Sections from 'components/sections';

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

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { cat } = query

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
      'author',
      'minReading'
    ],
    cat
  )
  const { metadata, title, categories, articlesCarouselTitle } = getPageData(locale, 'blog')

  const pageData = {
    metadata,
    sections: [
      {
        template: 'page-hero',
        title
      },
      {
        template: 'articles-search',
        categories,
        articles,
      },
      {
        template: 'articles-carousel',
        title: articlesCarouselTitle,
        articles,
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