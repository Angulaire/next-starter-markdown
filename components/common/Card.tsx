import { Box, useStyleConfig } from '@chakra-ui/core';

const styleConfig = {
  baseStyle: {
    bg: 'white',
    borderRadius: 'default',
    transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out',
  },
  variants: {
    default: {
      boxShadow: 'primary',
    },
    animated: {
      _hover: {
        boxShadow: 'primaryHover',
        transform: 'translateY(-3px)'
      },
    },
  },
}

export const Card = ({ variant="default", ...rest }) => {

  const styles: any = useStyleConfig("Card", {
    variant,
    styleConfig,
  })

  return <Box sx={styles} {...rest} />
}