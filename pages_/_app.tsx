import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme from 'theme';

export default function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider theme={theme}>
      <CSSReset/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}