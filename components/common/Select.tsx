import { Box, useStyleConfig, useTheme } from '@chakra-ui/core';
import ReactSelect from 'react-select';

const styleConfig = {
  baseStyle: {
    borderRadius: 'default'
  }
}

export default function Select({ ...rest }) {
  const theme = useTheme();

  const defaultStyles = {
    control: base => ({
      ...base,
      cursor: 'pointer',
      fontSize: theme.fontSizes.sm,
      border: 'none',
      boxShadow: 'none',
      minHeight: '28px',
      backgroundColor: theme.colors.accent2,
      borderRadius: '20px',
      padding: '0 8px',
      width: '75px'
    }),
    valueContainer: base => ({
      ...base,
      justifyContent: 'flex-end',
    }),
    indicatorsContainer: () => ({
      height: 'auto'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      padding: '0px',
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    singleValue: (base, state) => ({
      color: theme.colors.accent5,
    }),
    menu: (base, state) => ({
      ...base,
      color: theme.colors.accent5,
      background: 'white',
      textAlign: 'left'
    }),
    option: (base, state) => ({
      ...base,
      cursor: 'pointer',
      fontSize: theme.fontSizes.sm,
      color: state.isSelected ? theme.colors.text : theme.colors.accent5,
      background: state.isSelected ? theme.colors.redTransparent : 'transparent',
    })
  };

  const styles: any = useStyleConfig("Select", {
    styleConfig,
  })

  return <Box as={ReactSelect} styles={defaultStyles} sx={styles} {...rest} />
}