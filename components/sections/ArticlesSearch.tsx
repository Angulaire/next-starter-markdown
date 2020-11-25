import { Stack, Grid, Flex, Tag, Box, Input, List, ListItem } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
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
    includeMatches: true
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
    <Container>
      <Box mx="auto" maxWidth="40%">
        <Input
          key="searchbox"
          placeholder={"Search"}
          variant="flushed" 
          value={query} 
          onChange={handleChange}
          textAlign="center"
          fontSize="2xl"
          p="8"
          sx={{
            '&::placeholder': { color: 'accent.300' },
            '&:focus::placeholder': { color: 'transparent' }
          }}
        />
        <List display="flex" py="5" justifyContent="space-between">
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
    </Container>
  )
}