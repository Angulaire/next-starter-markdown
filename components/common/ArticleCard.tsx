/** @jsx jsx */
import { jsx } from '@chakra-ui/system';
import { Grid, Flex, Heading, Image, Tag } from '@chakra-ui/core';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import readingTime from 'reading-time';
import { Card } from 'components/common/Card';

export default function ArticleCard({ article }) {
  const { t, lang } = useTranslation()
  const { minutes }= readingTime(article.content);

  return (
    <Card as="article" variant="animated" sx={{ p: 0 }}>
      <Link href="/blog/[slug]" as={`/blog/${article.slug}`}>
        <a sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <figure>
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_auto:100,dpr_auto/${article.coverImage}`}
              alt={`Cover image for ${article.title}`}
              boxSize="100%"
              objectFit="cover"
              maxHeight="12rem"
            />
          </figure>
          <div sx={{
            p: '15px 20px', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
          }}>
            <div>
              <Heading as="h2" fontSize="xl" mb={4}>{article.title}</Heading>
              <p>{article.description}</p>
            </div>
            <div>
              <Tag>{article.category}</Tag>
            </div>
            <Grid gridTemplateColumns={'1fr 1fr'}>
              <Flex>
                <time>{new Intl.DateTimeFormat(lang).format(new Date(article.date))}</time>
              </Flex>
              <Flex justifyContent="flex-end">
                <div>
                  {`${Math.ceil(minutes)} min. ${t('common:read')}`}
                </div>
              </Flex>
            </Grid>
          </div>
        </a>
      </Link>
    </Card>
  )
}