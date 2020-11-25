import { Stack, Grid, Flex, Tag, Box, Input, List, Icon, ListItem } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
import ArticleCard from 'components/common/ArticleCard';
import NextLink from 'next/link';
import Fuse from 'fuse.js';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'lib/hooks/useTranslation';
import { AiOutlineSearch } from 'react-icons/ai';

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
  const articleQueryResults = query ? results.map(article => article.item) : articles;
  const articleResults = cat ? articleQueryResults.filter(article => article.category.toLowerCase() === cat) : articleQueryResults

  function handleChange(event) {
    const value = event.target.value
    setQuery(value);
    router.replace(href(value, cat), undefined, { shallow: true })
  }

  return (
    <Container layerStyles={{ dark: 'greyDark', light: 'greyLight' }}>
      <Box mx="auto" maxWidth={['80%', '50%']} position="absolute" left="0" right="0" top="-2rem">
        <Flex
          bg="white"
          borderRadius="xl"
          shadow="2xl"
          alignItems="center"
          pl="5"
        >
          <Icon as={AiOutlineSearch} h={6} w={6} />
          <Input
            key="searchbox"
            placeholder={"Search"}
            variant="flushed" 
            value={query} 
            onChange={handleChange}
            focusBorderColor="transparent"
            fontSize="xl"
            py="8"
            px="3"
            sx={{
              '&::placeholder': { color: 'accent.300' },
              // '&:focus::placeholder': { color: 'transparent' }
            }}
          />
        </Flex>
        <List display="flex" py="5" justifyContent="space-between" mx="auto" maxWidth={['100%','50%']}>
          <ListItem>
            <NextLink href={href(query, null)} shallow={true} scroll={false}>
              <button>
                <Tag>{t['all']}</Tag>
              </button>
            </NextLink>
          </ListItem>
          {categories.map(category => {
            return (
              <ListItem>
                <NextLink href={href(query, category.name.toLowerCase())} shallow={true} scroll={false}>
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