import { Box, useStyleConfig } from '@chakra-ui/core';

const styleConfig = {
  baseStyle: {
    borderRadius: 'default',
    fontWeight: 'bold',
    transition: 'all 0.2s'
  },
  sizes: {
    default: {
      px: '25px',
      py: '10px'
    },
    small: {
      px: '18px',
      py: '12px',
      fontSize: 'sm'
    },
    large: {
      px: '24px',
      py: '16px',
      fontSize: 'lg'
    },
  },
  variants: ({ colorMode }) => ({
    primary: {
      bg: colorMode === 'dark' ? 'white' : 'black',
      color: colorMode === 'dark' ? 'black' : 'white'
    },
    outline: {
      border: '1px solid',
      borderColor: colorMode === 'dark' ? 'white' : 'black',
    },
    link: {
      color: colorMode === 'dark' ? 'white' : 'black',
      transition: 'all .2s ease',
      '&:hover': {
        opacity: .6
      }
    }
  }),
}

export const Button = ({ size='default', variant='primary', ...rest }) => {

  const styles: any = useStyleConfig('Button', {
    size,
    variant,
    styleConfig,
  })

  return <Box as="button" sx={styles} {...rest} />
}