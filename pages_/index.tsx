import Layout from 'components/layout/Layout';
import Hero from 'components/common/Hero';
import { useTranslation } from 'next-translate';

export default function Homepage() {
  const { t, lang } = useTranslation()
  const sections = t('home:sections', {}, { returnObjects: true })

  return (
    <Layout
      seo={{
        title: t('home:title'),
        description: t('home:description'),
        ogType: t('home:ogType')
      }}>
      {sections.map(section => {
        if (section.template === 'hero'){
          return (
            <Hero 
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