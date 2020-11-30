import { Box, Grid, Flex, Heading, Text, Avatar, Tag, List, ListItem, Icon } from '@chakra-ui/react';
import PageHero from 'components/sections/page-hero';
import ReactMarkdown from 'react-markdown';
import NextLink from 'next/link';
import Seo from './seo';
import Image from 'next/image';
import { useTranslation } from 'lib/hooks/useTranslation';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Container } from 'components/layout/Container';
import SocialsShare from 'components/common/SocialsShare';

export default function Article(props) {
  const { title, category, slug, date, content, description, coverImage, minReading, author } = props
  const { t, locale } = useTranslation()
  const localeDatePublished = new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <>
      <Seo {...props}/>
      <Box as='article' mx="auto" maxWidth={['100%', '70%']}>
        <PageHero
          headline={
            <List display="flex" justifyContent="center">
              <ListItem display="flex" alignItems="center" mr="5">
                <NextLink href={{
                  pathname: '/blog',
                  query: { cat: category.toLowerCase() },
                }}>
                  <a>
                    <Tag>{category}</Tag>
                  </a>
                </NextLink>
              </ListItem>
              <ListItem display="flex" alignItems="center" color="gray.400">
                <Box as="span" mr="3">
                  <Icon as={AiOutlineClockCircle} w={5} h={5} />
                </Box>
                <span>{`${minReading} min. ${t['read']}`}</span>
              </ListItem>
            </List>
          }
          title={title}
        />
        <Container size="defaultPT0">
          <Box as="figure" position="relative" width="100%" height={['200px', '350px']} mb="10">
            <Image 
              src={coverImage} 
              alt={`Alt for ${title}`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Text fontWeight="bold" fontSize="2xl" textAlign="center">{description}</Text>
          <Box as={ReactMarkdown} mt="10" source={content} />
          <Flex justifyContent="center" my="5">
            <Flex>
              <Avatar src={author.avatar} name={author.name}/>
              <Box ml="3">
                <Text fontWeight="bold">{author.name}</Text>
                <time>{localeDatePublished}</time>
              </Box>
            </Flex>
          </Flex>
          <SocialsShare 
            title={title}
            description={description}
            media={coverImage}
            facebook
            linkedin
            twitter
            pinterest
          />
        </Container>
      </Box>
    </>
  )
}