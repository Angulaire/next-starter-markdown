import { Box, Grid, Flex, Heading, Text, Tag } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'lib/hooks/useTranslation';
import { Card } from 'components/common/Card';

export default function ArticleCard({ slug, title, description, coverImage, category, date, minReading }) {
  const { t, lang, locale } = useTranslation()
  const localeDatePublished = new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <Link href={`/blog/${slug}`} locale={lang}>
      <a>
        <Card as="article" variant="animated" height="100%">
          <Box as="figure">
            <Image
              src={coverImage}
              alt={`Cover image for ${title}`}
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
              <Heading as="h2" fontSize="xl" mb={4}>{title}</Heading>
              <Text>{description}</Text>
            </div>
            <Box mt="5">
              <Tag mb="5">{category}</Tag>
              <Grid gridTemplateColumns="1fr 1fr">
                <Flex>
                  <time>{localeDatePublished}</time>
                </Flex>
                <Flex justifyContent="flex-end">
                  <Text>
                    {`${minReading} min. ${t['read']}`}
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