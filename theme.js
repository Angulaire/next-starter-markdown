import chakraTheme from 'chakra';

export default {
  ...chakraTheme,
  breakpoints: ["30em", "48em", "62em", "80em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Geomanist"',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    ...chakraTheme.colors,
    grey: '#FAFAFA',
    primary: '#07C',
    secondary: '#30C'
  },
  shadows :{
    ...chakraTheme.shadows,
    primary: '0 5px 10px rgba(0,0,0,.12)',
    primaryHover: '0 8px 30px rgba(0,0,0,.12)'
  },
  radii: {
    ...chakraTheme.radii,
    default: '5px',
    full: '100px'
  },
  sizes: {
    ...chakraTheme.space,
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
    navigation: 10,
    modal: 100
  },
  styles: {
    global: {
      '@font-face': {
        fontFamily: '"Geomanist"',
        src: 'url(/fonts/Geomanist-Bold.woff) format("woff2")',
      },
      height: '100%', '#__next': { height: '100%' },
      display: 'flex',
      flexDirection: 'column',
      bg: 'grey',
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        fontWeight: 'heading',
        lineHeight: 'heading',
        color: 'black'
      },
      'h1': {
        fontSize: [7, 8],
      },
      'h2': {
        fontSize: [6, 7],
      },
      'h3': {
        fontSize: [5, 6],
      },
      'h4': {
        fontSize: [4, 5],
      },
      'h5': {
        fontSize: [3, 4],
      },
      'h6': {
        fontSize: [2, 3],
      },
      'p': {
        fontSize: 2,
        color: '#333'
      },
      'a': {
        color: '#333',
        cursor: 'pointer',
        transition: 'all .2s ease',
        '&:hover': {
          color: 'black'
        }
      }
    }
  }
}