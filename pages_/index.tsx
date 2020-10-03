import { GetStaticProps } from 'next';
import Layout from 'components/layout/Layout';
import Hero from 'components/sections/Hero';

export default function Homepage({ globalData, pageData }) {
  return (
    <Layout metadata={pageData.metadata}>
      {pageData.sections.map(section => {
        if (section.template === 'hero'){
          return (
            <Hero 
              key={section.template}
              title={section.title}
              image={section.image}
              alt={section.alt}
            />
          )
        }
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  let pageData = null
  let globalData = null
  pageData = {
    metadata: {
      metaTitle: "metaTitle from CMS",
      metaDescription: "metaDescription from CMS"
    },
    sections: [
      {
        template: 'hero',
        title: "Quickstart awesome websites"
      }
    ]
  }

  return {
    props: {
      globalData,
      pageData
    }
  }
}