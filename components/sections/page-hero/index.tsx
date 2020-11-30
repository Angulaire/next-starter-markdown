import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';

type IProps = {
  headline?: string | React.ReactNode;
  title: string;
  description?: string;
}

export default function PageHero({ headline, title, description }: IProps) {
  return (
    <Container size="defaultPY50">
      <Flex alignItems="center" justifyContent="center">
        <Box>
          {typeof headline === 'string'
            ? <Text>{headline}</Text>
            : headline
          }
          <Heading as="h1" textStyle="h1" textAlign="center" my="5">{title}</Heading>
          <Text>{description}</Text>
        </Box>
      </Flex>
    </Container>
  )
}