import { Stack, Grid, Flex, Tag, Box, Input, List, ListItem } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
import ArticlesGrid from 'components/sections/ArticlesGrid';
import Fuse from 'fuse.js';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ArticlesSearch({ articles }) {
  const router = useRouter();
  const q: any = queryString.parse(router.asPath.split(/\?/)[1]).q
  const [query, setQuery] = useState(q ? q : '');

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
    router.replace(value !== '' ? { pathname: '/blog', query: { q: value }} : { pathname: '/blog' })
  }

  // console.log("articleResults", articleResults)

  return (
    <>
      <Container>
        <Box position="relative">
          <Input 
            placeholder={"Searccj"}
            variant="flushed" 
            value={query} 
            onChange={handleChange}
            sx={{
              borderColor: 'green',
              textAlign: 'center',
              fontSize: ['2xl'],
              p: 8,
              '&::placeholder': {
                color: 'blue',
              },
              '&:focus::placeholder': {
                color: 'transparent'
              }
            }}
          />
        </Box>
      </Container>
      <ArticlesGrid articles={articleResults} />
    </>
  )
}