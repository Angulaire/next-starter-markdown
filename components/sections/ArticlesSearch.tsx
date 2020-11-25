import { Stack, Grid, Flex, Tag, Box, Input, List, ListItem } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
import ArticleCard from 'components/common/ArticleCard';
import NextLink from 'next/link';
import Fuse from 'fuse.js';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'lib/hooks/useTranslation';

export default function Search({ categories, articles }) {
  const router = useRouter();
  const { t } = useTranslation()
  const { q, cat }: any = queryString.parse(router.asPath.split(/\?/)[1])
  const [query, setQuery] = useState(q ? q : '');

  function href(q, cat) {
    const allQueries = {
      ...q && { q },
      ...cat && { cat }
    }
    return (q || cat) ? { pathname: '/blog', query: allQueries } : '/blog'
  }

  const fuse = new Fuse(articles, {
    keys: [ 'title' ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.1
  });
  const results = fuse.search(query);
  const articleResults = query ? results.map(article => article.item) : articles;

  function handleChange(event) {
    const value = event.target.value
    setQuery(value);
    router.replace(href(value, cat), undefined, { shallow: true })
  }

  // console.log("articleResults", articleResults)

  return (
    <Container layerStyles={{ dark: 'greyDark', light: 'greyLight' }}>
      <Box mx="auto" maxWidth={['80%', '50%']} position="absolute" left="0" right="0" top="-2rem">
        <Input
          key="searchbox"
          placeholder={"Search"}
          variant="flushed" 
          value={query} 
          onChange={handleChange}
          focusBorderColor="transparent"
          fontSize="xl"
          p="8"
          bg="white"
          borderRadius="xl"
          shadow="2xl"
          sx={{
            '&:focus': { boxShadow: '2xl' },
            '&::placeholder': { color: 'accent.300' },
            // '&:focus::placeholder': { color: 'transparent' }
          }}
        />
        <List display="flex" py="5" justifyContent="space-between" mx="auto" maxWidth={['100%','60%']}>
          <ListItem>
            <NextLink href={href(query, null)} shallow={true}>
              <button>
                <Tag>{t['all']}</Tag>
              </button>
            </NextLink>
          </ListItem>
          {categories.map(category => {
            return (
              <ListItem>
                <NextLink href={href(query, category.name.toLowerCase())} shallow={true}>
                  <button>
                    <Tag>{category.name}</Tag>
                  </button>
                </NextLink>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Results articles={articleResults} />
    </Container>
  )
}

function Results( { articles }) {
  return (
    <Grid gridTemplateColumns={['1fr', 'repeat(3, 1fr)']} gridGap="5" mt={[10, 0]}>
      {articles.length > 0 && articles.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </Grid>
  )
}