import { Stack, Grid, Flex, Tag, Box, Input, List, Icon, ListItem, ButtonGroup, Button } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
import ArticleCard from 'components/common/ArticleCard';
import NextLink from 'next/link';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'lib/hooks/useTranslation';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export default function ArticlesSearch({ categories, articles, perPage = 3,  }) {
  const router = useRouter();
  const { t } = useTranslation()
  const { q, cat, p }: any = router.query

  function href(q, p, cat) {
    const allQueries = {
      ...q && { q },
      ...p && { p },
      ...cat && { cat }
    }
    return (q || p || cat) ? { pathname: '/blog', query: allQueries } : '/blog'
  }

  // Move to page/blog/index => getServerSideProps when having a backend (e.g. headless CMS, ...)
  const fuse = new Fuse(articles, {
    keys: [ 'title' ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.1
  });
  const results = fuse.search(q ? q : '');
  const articleResults = q ? results.map(article => article.item) : articles;
  const totalCount = articleResults.length
  const pageCount = Math.ceil(totalCount / perPage);
  const initialPage = p ? (p * perPage - perPage) : 0
  const paginatedResults = articleResults.slice(initialPage, initialPage + perPage)

  function handleChange(event) {
    const value = event.target.value
    router.replace(href(value, null, cat))
  }

  return (
    <Container layerStyles={{ dark: 'greyDark', light: 'greyLight' }}>
      <Box mx="auto" maxWidth={['80%', '50%']} position="absolute" left="0" right="0" top="-2rem">
        <Flex
          bg="white"
          borderRadius="xl"
          shadow="2xl"
          alignItems="center"
          px="5"
        >
          <Icon as={AiOutlineSearch} h={6} w={6} />
          <Input
            key="searchbox"
            placeholder={"Search"}
            variant="flushed" 
            value={q ? q : ''} 
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
          {q &&
            <NextLink href={href(null, null, cat)} scroll={false}>
              <button>
                <Icon as={AiOutlineClose} h={6} w={6} />
              </button>
            </NextLink>
          }
        </Flex>
        <List display="flex" py="5" justifyContent="space-between" mx="auto" maxWidth={['100%','50%']}>
          <ListItem>
            <NextLink href={href(q, null, null)} scroll={false}>
              <button>
                <Tag>{t['all']}</Tag>
              </button>
            </NextLink>
          </ListItem>
          {categories.map(category => {
            return (
              <ListItem>
                <NextLink href={href(q, null, category.value)} scroll={false}>
                  <button>
                    <Tag>{category.name}</Tag>
                  </button>
                </NextLink>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Results articles={paginatedResults} />
      {totalCount > perPage &&
        <Flex justifyContent="center" mt="5">
          <ButtonGroup spacing={6}>
            {[...Array(pageCount)].map((_, i) => (
              <NextLink href={href(q, i === 0 ? null : i + 1, cat)} scroll={false}>
                <Button>{i + 1}</Button>
              </NextLink>
            ))}
          </ButtonGroup>
        </Flex>
      }
    </Container>
  )
}

function Results({ articles }) {
  return (
    <Grid gridTemplateColumns={['1fr', 'repeat(3, 1fr)']} gridGap="5" mt={[10, 0]}>
      {articles.length > 0 && articles.map(article => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </Grid>
  )
}