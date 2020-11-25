import { Box, Grid, Flex, Heading, Text, Tag } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'lib/hooks/useTranslation';
import readingTime from 'reading-time';
import { Card } from 'components/common/Card';

export default function ArticleCard({ article }) {
  const { t, lang } = useTranslation()
  const { minutes }= readingTime(article.content);

  return (
    <Link href={`/blog/${article.slug}`} locale={lang}>
      <a>
        <Card as="article" variant="animated" height="100%">
          <Box as="figure">
            <Image
              src={article.coverImage}
              alt={`Cover image for ${article.title}`}
              width={1200}
              height={800}
            />
          </Box>
          <Box sx={{
            p: '15px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            flex: 1
          }}>
            <div>
              <Heading as="h2" fontSize="xl" mb={4}>{article.title}</Heading>
              <Text>{article.description}</Text>
            </div>
            <Box mt="5">
              <Tag mb="5">{article.category}</Tag>
              <Grid gridTemplateColumns="1fr 1fr">
                <Flex>
                  <time>{new Intl.DateTimeFormat(lang).format(new Date(article.date))}</time>
                </Flex>
                <Flex justifyContent="flex-end">
                  <Text>
                    {`${Math.ceil(minutes)} min. ${t['read']}`}
                  </Text>
                </Flex>
              </Grid>
            </Box>
          </Box>
        </Card>
      </a>
    </Link>
  )
}