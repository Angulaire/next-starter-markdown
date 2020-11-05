import { Grid, Flex, Heading, Text } from '@chakra-ui/core';
import { Card } from 'components/common/Card';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Container } from 'components/layout/Container';

export default function Hero({ title, description, image }) {
  const { locale } = useRouter()

  return (
    <Container>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap="5">
        <Flex alignItems="center" justifyContent="flex-start">
          <Heading as="h1">{title[locale]}</Heading>
          <Text>{description}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Card width="100%" size="defaultP0">
            <Image
              src="/forest.jpg"
              alt="Forest with trees"
              width={5324}
              height={3547}
            />
          </Card>
        </Flex>
      </Grid>
    </Container>
  )
}