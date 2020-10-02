/** @jsx jsx */
import { jsx } from '@chakra-ui/system';
import { Grid, Flex, Heading } from '@chakra-ui/core';
import Layout from 'components/layout/Layout';
import { Container } from 'components/layout/Container';
import { Card } from 'components/common/Card';
import ContactForm from 'components/form/Contact';
import { useTranslation } from 'next-translate';
import ReactMarkdown from 'react-markdown';
import siteConfig from 'siteconfig.json';

export default function ContactPage() {
  const { t, lang } = useTranslation()
  const sections = t('contact:sections', {}, { returnObjects: true })

  return (
    <Layout
      seo={{
        title: t('contact:title'),
        description: t('contact:description'),
        ogType: t('contact:ogType')
      }}>
      {sections.map(section => {
        if (section.template === 'contact-section'){
          return (
            <Container>
              <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap={[10, 40]}>
                <Flex justifyContent="center" alignItems="center">
                  <div>
                    <Heading as="h1" mb={10}>{section.title}</Heading>
                    <div>
                      <ReactMarkdown source={siteConfig.contact.address} />
                      <p sx={{mt: 5, 'span': { display: 'block' }}}>
                        <span>{`Tel: ${siteConfig.contact.phone}`}</span>
                        <span>{`Email: ${siteConfig.contact.email}`}</span>
                      </p>
                    </div>
                  </div>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <Card width="100%">
                    <ContactForm />
                  </Card>
                </Flex>
              </Grid>
            </Container>
          )
        }
      })}
    </Layout>
  )
}