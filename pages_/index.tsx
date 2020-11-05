import { GetStaticProps } from 'next';
import { getGlobalData } from 'lib/api';
import Layout from 'components/layout/Layout';
import Hero from 'components/sections/Hero';

export default function Homepage({ globalData, pageData }) {

  return (
    <Layout 
      metadata={pageData.metadata}
      globalData={globalData}
    >
      {pageData.sections.map(section => {
        if (section.template === 'hero'){
          return (
            <Hero 
              key={section.template}
              title={section.title}
              description={section.description}
              image={section.image}
            />
          )
        }
      })}
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