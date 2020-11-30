import { Grid, Flex, Heading, Text, List, ListItem, Link, Icon } from '@chakra-ui/react';
import { Angulaire } from 'components/common/Logo';
import { Container }from 'components/layout/Container';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AiFillFacebook, AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai';
import siteConfig from 'siteconfig.json';

export default function Footer({ headline, categories }) {
  const { locale } = useRouter()
  const logos = {
    "Facebook": AiFillFacebook,
    "Twitter": AiFillTwitterSquare,
    "LinkedIn": AiFillLinkedin
  };

  return (
    <Container as="footer" size="defaultPY50" variant="footer">
      <Grid gridTemplateColumns={['1fr', '3fr 5fr',]} gridGap={[10]} mb={[10, 5]}>
        <div>
          <div>
            <Angulaire width="10rem"/>
          </div>
          <Text mt="8" fontSize="sm">{headline}</Text>
        </div>
        <Grid gridTemplateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)',]} gridGap={4}>
          {categories.map((category, index) => (
            <div key={index}>
              <Heading as="h6" textStyle="h6" mb="5">{category.title}</Heading>
              <List>
                {category.links.map((link, i) => (
                  <ListItem key={i} mb="1">
                    <NextLink href={link.url} locale={locale}>
                      <Link>{link.text}</Link>
                    </NextLink>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </Grid>
      </Grid>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr',]}>
        <Flex alignItems="flex-end" justifyContent={['center', 'flex-start']} order={[2, 1]}>
          <Text fontSize="xs">Copyright © 2020 Angulaire All rights reserved.</Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent={['center', 'flex-end']} order={[1, 2]} mb={[10, 0]}>
          <List display="flex">
            {siteConfig.contact.socials.map((social, i) => {
              const Logo = logos[social.network]
              return (
                <ListItem key={i}>
                  <a href={social.url} target="_blank" rel="nofollow">
                    <Icon as={Logo} h={6} w={6} />
                  </a>
                </ListItem>
              )
            })}
          </List>
        </Flex>
      </Grid>
    </Container>
  );
}