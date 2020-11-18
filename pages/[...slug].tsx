import { GetStaticPaths, GetStaticProps } from 'next';
import { getGlobalData, getPageData, getAllArticles, getArticleBySlug } from 'lib/api';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from 'components/layout/Layout';
import Hero from 'components/sections/Hero';
import Contact from 'components/sections/Contact';
import ArticlesGrid from 'components/common/ArticlesGrid';
import Article from 'components/sections/Article';

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
        if (section.template === 'article'){
          return (
            <Article
              key={section.template} 
              {...section.article}
            />
          )
        }
        if (section.template === 'contact-section'){
          return (
            <Contact
              key={section.template}
              title={section.title}
            />
          )
        }
        if (section.template === 'articles-grid'){
          return (
            <ArticlesGrid 
              key={section.template} 
              articles={section.articles}
            />
          )
        }
      })}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const pages = [
    { slug: 'contact' },
    { slug: 'blog' },
  ]
  const pagePaths = pages.map(page => ({
    params: { slug: [page.slug] }
  }))

  const articles = await getAllArticles('en', ['slug'])
  const articlePaths = articles.map(article => ({
    params: { slug: [ 'blog', article.slug ]}
  }))

  const paths = [...pagePaths, ...articlePaths]

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slugArray = Object.keys(params).length === 0 ? ['index'] : params.slug
  const lastSlug = slugArray[slugArray?.length - 1]
  const firstSlug = slugArray[0]

  let pageData = null
  if(slugArray.length > 1 && firstSlug === "blog") {
    const article = getArticleBySlug(
      locale,
      lastSlug, 
      [
        'title',
        'date',
        'slug',
        'content',
        'coverImage',
        'category',
        'author'
      ]
    )
    pageData = {
      metadata: {
        metaTitle: "metaTitle from CMS",
        metaDescription: "metaDescription from CMS"
      },
      sections: [
        {
          template: 'article',
          article
        }
      ]
    }
  } else if(slugArray.length === 1 && firstSlug === "blog") {
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
    pageData = {
      metadata: {
        metaTitle: "metaTitle from CMS",
        metaDescription: "metaDescription from CMS"
      },
      sections: [
        {
          template: 'articles-grid',
          articles
        }
      ]
    }
  } else if(firstSlug === "contact") {
    pageData = await getPageData(locale, "contact")
  }

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