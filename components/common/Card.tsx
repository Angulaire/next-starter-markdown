import { chakra } from '@chakra-ui/core';

export const Card = chakra("div", {
  baseStyle: {
    bg: 'white',
    borderRadius: 'default',
    overflow: 'hidden',
    boxShadow: 'primary',
    transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
  },
  sizes: {
    withPadding: {
      p: 8
    }
  },
  variants: {
    animated: {
      _hover: {
        boxShadow: 'primaryHover',
        transform: 'translateY(-3px)'
      }
    }
  },
})