import { Grid, Flex, List, ListItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Media } from 'components/layout/Media';
import { Container } from 'components/layout/Container';
import { Button } from 'components/common/Button';
import { Angulaire } from 'components/common/Logo';
import Link from 'next/link';
import LangSelect from 'components/common/LangSelect';
import MobileMenu from 'components/layout/MobileMenu';

type HeaderProps = {
  menu: {
    links: {
      url: string
      text: string
      targetBlank: boolean
    }[]
  }
}

export default function Header({ menu }: HeaderProps) {
  const [scrollTop, setScrollTop] = useState(0);
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
      bg={scrollTop > 20 ? 'white' : 'transparent'}
      style={{ backdropFilter: scrollTop > 20 && 'blur(20px)' }}
    >
        <Grid gridTemplateColumns={['60% repeat(2, auto)', '1fr 2fr 1fr']} height="100%">
        <Flex alignItems="center" justifyContent="flex-start">
          <Link href="/" aria-label="Home">
            <a>
              <Logo />
            </a>
          </Link>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Media greaterThan="xs">
            <List display="flex">
              {menu.links.map(link => (
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
            <MobileMenu logo={<Logo />} links={menu.links}/>
          </Media>
        </Flex>
      </Grid>
    </Container>
  );
};