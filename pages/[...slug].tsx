import { GetStaticPaths, GetStaticProps } from 'next';
import { getGlobalData, getPageData } from 'lib/api';
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

  const pages = [
    { slug: 'contact' }
  ]
  const paths = pages.map(page => ({
    params: { slug: [page.slug] }
  }))

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params

  const pageData = await getPageData(locale, slug)

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