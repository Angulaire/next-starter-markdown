import { Grid } from '@chakra-ui/react';
import ArticleCard from 'components/common/ArticleCard';
import { Container } from 'components/layout/Container';

export default function ArticlesGrid({ articles }) {
  return (
    <Container>
      <Grid gridTemplateColumns={['1fr', 'repeat(3, calc(96% / 3))']} gridGap="2%">
        {articles.length > 1 && articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </Grid>
    </Container>
  );
};