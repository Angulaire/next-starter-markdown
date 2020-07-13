/** @jsx jsx */
import React, { Component } from 'react';
import { jsx, Grid, Flex, List, ListItem } from '@chakra-ui/core';
import { Container } from 'components/layout/Container';
import { Button } from 'components/common/Button';
import { Angulaire } from 'components/common/Logos';
import withTranslation from 'next-translate/withTranslation';
import Link from 'next-translate/Link';
import LangSelect from 'components/common/LangSelect';
import MobileMenu from 'components/layout/MobileMenu';

class Header extends React.Component {
  state = {
    hasScrolled: false
  };

  handleScroll = (event) => {
    const scrollTop = window.pageYOffset
  
    if (scrollTop > 50) {
      this.setState({ hasScrolled: true })
    } else {
      this.setState({ hasScrolled: false })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  render() {
    const { t, lang } = this.props.i18n
    const links = t('global:header.links', {}, { returnObjects: true })
    const Logo = Angulaire
    
    return (
      <Container 
        as="header" 
        variant="header" 
        size="header"
        sx={{
          bg: this.state.hasScrolled ? 'white' : 'transparent',
          backdropFilter: this.state.hasScrolled && 'blur(20px)'
        }}
      >
         <Grid gridTemplateColumns={['60% repeat(2, auto)', '1fr 2fr 1fr']} height="100%">
          <Flex alignItems="center" justifyContent="flex-start">
            <a href="/">
              <Logo />
            </a>
          </Flex>
          <Flex alignItems="center" justifyContent="center" display={['none', 'inherit']}>
            <div>
              <List sx={{
                'li': {
                  display: 'inline-block',
                  mb: 0
                }
              }}>
                {links.map(link => (
                  <ListItem key={link.url}>
                    <Link href={link.url}>
                      <Button>{link.text}</Button>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end">
            <LangSelect />
          </Flex>
          <div sx={{ display: ['flex', 'none'], alignItems: 'center', justifyContent: 'center' }}>
            <MobileMenu logo={<Logo />} links={links}/>
          </div >
        </Grid>
      </Container>
    );
  }
};
export default withTranslation(Header);