import { Grid, Flex, Box, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Container } from 'components/layout/Container';

export default function Hero({ title, description, image, buttons }) {
  return (
    <Container>
      <Grid gridTemplateColumns={['1fr', '4fr 3fr']} gridGap="10">
        <Flex alignItems="center" justifyContent="flex-start">
          <Box>
            <Heading as="h1" textStyle="h1">{title}</Heading>
            <Text>{description}</Text>
            <ButtonGroup spacing="5" mt="10">
              {buttons.map(button => (
                <NextLink key={button.url} href={button.url}>
                  <Button variant={button.variant}>{button.text}</Button>
                </NextLink>
              ))}
            </ButtonGroup>
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <figure>
            <Image
              src={image.url}
              alt={image.alt}
              width={5324}
              height={3547}
            />
          </figure>
        </Flex>
      </Grid>
    </Container>
  )
}