import { GetStaticProps } from 'next';
import { getPageData, getGlobalData } from 'lib/api';
import Layout from 'components/layout/Layout';
import Sections from 'components/sections';

export default function Homepage({ globalData, pageData }) {

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

  const pageData = getPageData(locale, 'home')

  const globalData = await getGlobalData(locale)

  return {
    props: {
      globalData,
      pageData
    }
  }
}