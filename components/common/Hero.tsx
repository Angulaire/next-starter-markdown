import { jsx, Grid, Flex, Image } from '@chakra-ui/core';
import { Container } from 'components/layout/Container';

export default ({ title, image, alt }) => {
  return (
    <Container>
      <Grid gridTemplateColumns={['1fr', '3fr 2fr']}>
        <Flex alignItems="start" justifyContent="flex-start">
          <h1>{title}</h1>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_auto:100,dpr_auto/${image}`}
            alt={alt}
            objectFit="cover"
            width="100%"
          />
        </Flex>
      </Grid>
    </Container>
  )
}