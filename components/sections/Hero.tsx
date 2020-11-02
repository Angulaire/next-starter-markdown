import { Grid, Flex } from '@chakra-ui/core';
import { Card } from 'components/common/Card';
import Image from 'next/image';
import { Container } from 'components/layout/Container';

export default function Hero({ title, image, alt }) {
  return (
    <Container>
      <Grid gridTemplateColumns={['1fr', '49% 49%']} gridGap="2%" height="80vh">
        <Flex alignItems="center" justifyContent="flex-start">
          <h1>{title}</h1>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Card width="100%" size="defaultP0">
            <Image
              src="/forest.jpg"
              width={5324}
              height={3547}
            />
          </Card>
        </Flex>
      </Grid>
    </Container>
  )
}