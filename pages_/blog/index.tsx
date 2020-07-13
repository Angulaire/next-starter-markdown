import { GetStaticProps } from 'next';
import { getAllArticles } from 'lib/api';
import Layout from 'components/layout/Layout';
import ArticlesGrid from 'components/common/ArticlesGrid';
import { Container } from 'components/layout/Container';
import { useTranslation } from 'next-translate';

const Index = ({ articles }) => {
  const { t, lang } = useTranslation()
  const sections = t('blog:sections', {}, { returnObjects: true })

  return (
    <Layout 
      seo={{
        title: t('blog:title'),
        description: t('blog:description'),
        ogType: t('blog:ogType')
      }}
    >
      {sections.map((section, index) => {
        if (section.template === 'articles-grid'){
          return (
            <ArticlesGrid key={index} articles={articles}/>
          )
        }
      })}
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx: any) => {
  const { lang } = ctx
  const articles = getAllArticles(
  lang,
  [
    'title',
    'description',
    'coverImage',
    'slug',
    'date',
    'category',
    'author'
  ])

  return {
    props: { articles }
  }
}