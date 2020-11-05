import { Box, useStyleConfig, useColorMode } from '@chakra-ui/core';

const styleConfig = {
  sizes: {
    default: {
      py: [8, 8],
      px: [5, 24]
    },
    large: {
      py: [8, 8],
      px: [5, 20]
    },
    largePY0: {
      px: [5, 20]
    },
  },
  variants: {
    header: {
      transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
      zIndex: 'navigation',
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: ['60px', '80px']
    },
    footer: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'accent.800' : 'accent.100',
      zIndex: 'navigation',
    })
  }
}

export const Container = ({ size='default', variant='primary', layerStyles = { dark: 'baseDark', light: 'baseLight' }, ...rest }) => {
  const { colorMode } = useColorMode()

  const styles: any = useStyleConfig('Button', {
    size,
    variant,
    styleConfig,
  })

  return <Box layerStyle={layerStyles[colorMode]} sx={styles} {...rest} />
}