import { chakra } from '@chakra-ui/core'

export const Container = chakra("section", {
  sizes: {
    default: {
      py: [10, 60],
      px: [5, 90],
    },
    large: {
      py: [10, 90],
      px: 0
    },
    center: {
      py: [10, 60],
      px: [5, 200]
    },
    header: {
      py: 0,
      px: [5, 90]
    },
    footer: {
      px: [5, 90],
      pt: [10, 20],
      pb: [5]
    }
  },
  variants: {
    header: {
      zIndex: 'navigation',
      bg: 'white',
      width: '100%',
      position: 'fixed',
      top: 0,
      height: 80,
      transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
    },
    footer: {
      bg: 'white'
    }
  }
})
Container.defaultProps = {
  size: "default"
}