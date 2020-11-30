import { Box, useStyleConfig, useTheme, useColorModeValue } from '@chakra-ui/react';
import ReactSelect from 'react-select';

export default function Select({ size = "md", variant = "default" , ...rest }) {
  const theme = useTheme();
  const styles = useStyleConfig("Select", { size, variant })

  const color = useColorModeValue("black", "white")
  const placholderColor = useColorModeValue(theme.colors.gray['400'], "rgba(255, 255, 255, 0.22)")
  const bg = useColorModeValue("white", theme.colors.accent['800'])
  const borderColor = useColorModeValue(theme.colors.gray['200'], "rgba(255, 255, 255, 0.16)")
  const borderColorHover = useColorModeValue(theme.colors.gray['300'], "rgba(255, 255, 255, 0.30)")

  const defaultStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: variant === 'link' ? 'transparent' : borderColor,
      cursor: 'pointer',
      boxShadow: variant === 'link' ? 'none' : state.isFocused && `0 0 0 2px ${theme.colors.blue['600']}`,
      '&:hover': {
        borderColor: variant === 'link' ? 'transparent' : borderColorHover
      },
    }),
    singleValue: (provided, state) => ({
      color: placholderColor
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: borderColor,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
    }),
    menu: (base, state) => ({
      ...base,
      backgroundColor: bg
    }),
    option: (base, state) => ({
      ...base,
      cursor: 'pointer',
      background: state.isSelected ? borderColor : 'transparent',
      color
    })
  };

  return <Box as={ReactSelect} styles={defaultStyles} sx={styles} {...rest} />
}