/** @jsx jsx */
import { jsx } from '@chakra-ui/system';
import { Grid, Flex, List, ListItem } from '@chakra-ui/core';
import { useState, useEffect } from 'react';
import { Media } from 'components/layout/Media';
import { Container } from 'components/layout/Container';
import { Button } from 'components/common/Button';
import { Angulaire } from 'components/common/Logo';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next-translate/Link';
import LangSelect from 'components/common/LangSelect';
import MobileMenu from 'components/layout/MobileMenu';

export default function Header() {
  const [scrollTop, setScrollTop] = useState(0);
  const { t, lang } = useTranslation()
  const links = t('global:header.links', {}, { returnObjects: true })
  const Logo = Angulaire

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
    
  return (
    <Container 
      as="header" 
      variant="header" 
      size="largePY0"
      sx={{
        bg: scrollTop > 20 ? 'white' : 'transparent',
        backdropFilter: scrollTop > 20 && 'blur(20px)'
      }}
    >
        <Grid gridTemplateColumns={['60% repeat(2, auto)', '1fr 2fr 1fr']} height="100%">
        <Flex alignItems="center" justifyContent="flex-start">
          <a href="/">
            <Logo />
          </a>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Media greaterThan="xs">
            <List display="flex">
              {links.map(link => (
                <ListItem key={link.url}>
                  <Link href={link.url}>
                    <Button variant="link">{link.text}</Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Media>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end">
          <LangSelect />
          <Media at="xs">
            <MobileMenu logo={<Logo />} links={links}/>
          </Media>
        </Flex>
      </Grid>
    </Container>
  );
};