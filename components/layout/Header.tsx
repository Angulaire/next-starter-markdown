import { useColorMode, Button, Grid, Flex, List, ListItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Media } from 'components/layout/Media';
import { Container } from 'components/layout/Container';
import { Angulaire } from 'components/common/Logo';
import Link from 'next/link';
import LangSelect from 'components/common/LangSelect';
import MobileMenu from 'components/layout/MobileMenu';
import { useTranslation } from 'lib/hooks/useTranslation';
import { ColorModeSwitcher } from 'components/common/ColorModeSwitcher';

export default function Header({ links }) {
  const [scrollTop, setScrollTop] = useState(0);
  const { colorMode } = useColorMode()
  const { t } = useTranslation()
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
      size="defaultPY0"
      bg={scrollTop > 20 ? (colorMode === 'dark' ? 'black' : 'white') : 'transparent'}
      style={{backdropFilter: scrollTop > 20 && 'blur(20px)'}}
    >
      <Grid gridTemplateColumns={['1fr 0 2fr', '1fr 2fr 1fr']} height="100%">
        <Flex alignItems="center" justifyContent="flex-start">
          <Link href="/" aria-label={t['home']}>
            <a>
              <Logo />
            </a>
          </Link>
        </Flex>
        <Flex as={Media} greaterThan="xs" alignItems="center" justifyContent="center">
          <List display="flex">
            {links.map(link => (
              <ListItem key={link.url} px="5">
                <Link href={link.url}>
                  <Button variant="link">{link.text}</Button>
                </Link>
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end">
          <List display="flex">
            <ListItem mr="5">
              <ColorModeSwitcher />
            </ListItem>
            <ListItem>
              <LangSelect />
            </ListItem>
            <ListItem as={Media} at="xs">
              <MobileMenu logo={<Logo />} links={links}/>
            </ListItem>
          </List>
        </Flex>
      </Grid>
    </Container>
  );
};