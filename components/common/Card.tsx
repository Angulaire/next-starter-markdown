import { Box, useStyleConfig } from '@chakra-ui/core';

const styleConfig = {
  baseStyle: ({ colorMode }) => ({
    transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
    bg: colorMode === 'dark' ? 'accent.800': 'white',
    borderRadius: 'default',
    overflow: 'hidden',
    display: 'flex', 
    flexDirection: 'column',
  }),
  variants: {
    default: {
      boxShadow: 'primary',
    },
    animated: {
      boxShadow: 'primary',
      _hover: {
        boxShadow: 'primaryHover',
        transform: 'translateY(-3px)'
      },
    },
  },
  sizes: {
    default: {
      p: 5
    },
    defaultP0: {
      p: 0
    }
  }
}

export const Card = ({ variant="default", size="default", ...rest }) => {

  const styles: any = useStyleConfig("Card", {
    variant,
    size,
    styleConfig,
  })

  return <Box sx={styles} {...rest} />
}