import { chakra } from '@chakra-ui/core';

export const Button = chakra("button", {
  baseStyle: {
    borderRadius: "md",
    p: "10px 25px",
    fontWeight: "bold",
    textTransform: "uppercase",
    transition: "all 0.2s",
  },
  sizes: {
    small: {
      paddingX: "18px",
      paddingY: "12px",
      fontSize: "14px",
    },
    large: {
      paddingX: "24px",
      paddingY: "16px",
      fontSize: "18px",
    },
  },
  variants: {
    primary: {
      bg: "black",
      color: "white",
    },
    icon: {
      bg: 'transparent'
    }
  },
})