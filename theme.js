export default {
  useSystemColorMode: false,
  initialColorMode: 'light',
  colors: {
    grey: '#FAFAFA',
    primary: '#07C',
    secondary: '#30C',
    accent: {
      100: '#FAFAFA',
      200: '#EAEAEA',
      300: '#999',
      400: '#888',
      500: '#666',
      600: '#444',
      700: '#333',
      800: '#111',
    }
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    normal: "normal",
    none: "1",
    shorter: "1.25",
    short: "1.375",
    base: "1.5",
    tall: "1.625",
    taller: "2",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  shadows :{
    primary: '0 5px 10px rgba(0,0,0,.12)',
    primaryHover: '0 8px 30px rgba(0,0,0,.12)',
    outline: 'transparent'
  },
  radii: {
    default: '5px',
    full: '100px'
  },
  sizes: {
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
  },
  space: {
    px: "1px",
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",
  },
  zIndices: {
    navigation: 1,
    modal: 10
  },
  textStyles: {
    h1: {
      fontSize: ['4xl', '6xl'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['3xl', '4xl'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h3: {
      fontSize: ['2xl', '3xl'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h4: {
      fontSize: ['xl', '2xl'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h5: {
      fontSize: ['lg', 'xl'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h6: {
      fontSize: ['md', 'lg'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
  },
  layerStyles: {
    baseDark: {
      bg: 'black',
      color: 'white'
    },
    baseLight: {
      bg: 'white',
      color: 'black'
    },
    greyLight: {
      bg: 'gray.50',
      color: 'black'
    },
    greyDark: {
      bg: 'gray.900',
      color: 'white'
    }
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'white' : 'black',
          color: props.colorMode === 'dark' ? 'black' : 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'white' : 'black',
            opacity: .6
          }
        }),
        outline: (props) => ({
          border: '1px solid',
          borderColor: props.colorMode  === 'dark' ? 'white' : 'black',
        }),
        link: (props) => ({
          color: props.colorMode === 'dark' ? 'white' : 'black',
          transition: 'all .2s ease',
          _hover: {
            textDecoration: 'none',
            opacity: .6
          }
        })
      },
    },
    Container: {
      baseStyle: {
        position: 'relative'
      },
      sizes: {
        default: {
          py: [20, 32],
          px: [5, 24]
        },
        defaultPY0: {
          px: [5, 24]
        },
        defaultPX0: {
          py: [20, 32]
        },
        defaultPY50: {
          py: [16, 16],
          px: [5, 24]
        },
        defaultPT0: {
          pb: [20, 32],
          px: [5, 24]
        },
        defaultPB0: {
          pt: [20, 32],
          px: [5, 24]
        },
      },
      variants: {
        header: {
          transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
          zIndex: 'sticky',
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          width: '100%',
          height: ['60px', '80px']
        },
        footer: ({ colorMode }) => ({
          bg: colorMode === 'dark' ? 'accent.800' : 'accent.100',
          zIndex: 'sticky',
        })
      }
    },
    Select: {
      baseStyle: {
        borderRadius: 'default',
      }
    },
    Card: {
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
    }
  },
  styles: {
    global: ({ colorMode }) => ({
      'html, body': {
        fontSize: 'md',
        lineHeight: 'tall',
        bg: colorMode === 'dark' ? 'black' : 'white',
      }
    })
  }
}