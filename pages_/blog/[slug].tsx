/** @jsx jsx */
import { jsx } from '@chakra-ui/system';
import { Flex, Heading, Text } from '@chakra-ui/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllArticles, getArticleBySlug } from 'lib/api';
import ReactMarkdown from 'react-markdown';
import Layout from 'components/layout/Layout';
import { Container } from 'components/layout/Container';

export default function ArticlePage({ article }) {
  return (
    <Layout
      seo={{
        title: article.title,
        description: article.description,
        ogType: 'article'
      }}>
      <Container as="article" size="center" textAlign="center">
      <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        <Flex justifyContent="flex-end" px={5}>
          <Text fontWeight="bold">{article.category}</Text>
        </Flex>
        <Flex justifyContent="flex-start" px={5}>
          <time sx={{ fontWeight: 'bold' }}>{(new Date(article.date)).toLocaleString()}</time>
        </Flex>
      </div>
      <Heading as="h1" my={[10, 20]}>{article.title}</Heading>
        <figure>
          <img src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_auto:100,dpr_auto/${article.coverImage}`} alt={`Cover Image for ${article.title}`}/>
        </figure>
        <ReactMarkdown sx={{ mt: 10 }} source={article.content} />
      </Container>
  </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const i18nConfig = await import('i18n.json')
  const { allLanguages } = i18nConfig
  const posts = allLanguages.flatMap(lang => (
    getAllArticles(lang, ['slug'])
  ))

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
  const { params, lang } = ctx
  const article = getArticleBySlug(
  lang,
  params.slug, 
  [
    'title',
    'date',
    'slug',
    'content',
    'coverImage',
    'category',
    'author'
  ])
  return {
    props: {
      article
    }
  }
}