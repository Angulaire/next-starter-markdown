import { Grid, Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
import { Card } from 'components/common/Card';
import ContactForm from 'components/form/Contact';
import ReactMarkdown from 'react-markdown';
import siteConfig from 'siteconfig.json';

export default function Contact({ title }) {

  return (
    <Container>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap={[10, 40]}>
        <Flex justifyContent="center" alignItems="center">
          <div>
            <Heading as="h1" mb={10}>{title}</Heading>
            <div>
              <ReactMarkdown source={siteConfig.contact.address} />
              <Text mt="5" sx={{ span: { display: 'block' }}}>
                <span>{`Tel: ${siteConfig.contact.phone}`}</span>
                <span>{`Email: ${siteConfig.contact.email}`}</span>
              </Text>
            </div>
          </div>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Card width="100%" p="5">
            <ContactForm />
          </Card>
        </Flex>
      </Grid>
    </Container>
  )
}