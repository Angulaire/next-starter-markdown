import { GetStaticProps } from 'next';
import { getGlobalData } from 'lib/api';
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

  let pageData = null
  pageData = {
    metadata: {
      metaTitle: "metaTitle from CMS",
      metaDescription: "metaDescription from CMS"
    },
    sections: [
      {
        template: 'hero',
        title: {
          en: "Quickstart awesome websites",
          fr: "Démarrez rapidement de nouveaux site"
        }
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