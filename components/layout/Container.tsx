import { Box, useStyleConfig, useColorMode } from '@chakra-ui/react';

export const Container = ({ size='default', variant='primary', layerStyles = { dark: 'baseDark', light: 'baseLight' }, ...rest }) => {
  const { colorMode } = useColorMode()

  const styles = useStyleConfig('Container', {
    size,
    variant,
  })

  return <Box layerStyle={layerStyles[colorMode]} sx={styles} {...rest} />
}