import { useColorMode, Grid, Flex, List, ListItem } from '@chakra-ui/core';
import { useState, useEffect } from 'react';
import { Media } from 'components/layout/Media';
import { Container } from 'components/layout/Container';
import { Button } from 'components/common/Button';
import { Angulaire } from 'components/common/Logo';
import Link from 'next/link';
import LangSelect from 'components/common/LangSelect';
import MobileMenu from 'components/layout/MobileMenu';
import useTranslation from 'next-translate/useTranslation';
import { ColorModeSwitcher } from 'components/common/ColorModeSwitcher';

export default function Header({ links }) {
  const [scrollTop, setScrollTop] = useState(0);
  const { colorMode } = useColorMode()
  const { t, lang } = useTranslation()
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
      bg={scrollTop > 20 ? (colorMode === 'dark' ? 'black' : 'white') : 'transparent'}
      style={{backdropFilter: scrollTop > 20 && 'blur(20px)'}}
    >
      <Grid gridTemplateColumns={['1fr 0 2fr', '1fr 2fr 1fr']} height="100%">
        <Flex alignItems="center" justifyContent="flex-start">
          <Link href="/" aria-label={t('common:home')}>
            <a>
              <Logo />
            </a>
          </Link>
        </Flex>
        <Flex as={Media} greaterThan="xs" alignItems="center" justifyContent="center">
          <List display="flex">
            {links.map(link => (
              <ListItem key={link.url}>
                <Link href={link.url}>
                  <Button variant="link">{link.text}</Button>
                </Link>
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end">
          <ColorModeSwitcher />
          <LangSelect />
          <Media at="xs">
            <MobileMenu logo={<Logo />} links={links}/>
          </Media>
        </Flex>
      </Grid>
    </Container>
  );
};