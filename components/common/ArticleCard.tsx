import { Box, Grid, Flex, Heading, Text, Tag, Avatar } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'lib/hooks/useTranslation';
import { Card } from 'components/common/Card';

export default function ArticleCard({ slug, title, description, coverImage, category, date, minReading, author }) {
  const { t, lang, locale } = useTranslation()
  const localeDatePublished = new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
  return (
    <Link href={`/blog/${slug}`} locale={lang}>
      <a>
        <Card as="article" variant="animated" height="100%">
          <Box as="figure" position="relative">
            <Image
              src={coverImage}
              alt={`Cover image for ${title}`}
              width={1200}
              height={800}
            />
            <Tag position="absolute" top="5" right="5">{category}</Tag>
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
              <Grid gridTemplateColumns="auto 80px">
                <Flex>
                  <Avatar src={author.avatar} name={author.name}/>
                  <Box ml="3">
                    <Text fontWeight="bold">{author.name}</Text>
                    <time>{localeDatePublished}</time>
                  </Box>
                </Flex>
                <Flex justifyContent="flex-end" alignItems="flex-end">
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