import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';

export default function PageHero({ headline, title, description }) {
  return (
    <Container>
      <Flex alignItems="center" justifyContent="center">
        <Box>
          {headline &&
            <Text>{headline}</Text>
          }
          <Heading as="h1" textStyle="h1">{title}</Heading>
          {description &&
            <Text>{description}</Text>
          }
        </Box>
      </Flex>
    </Container>
  )
}