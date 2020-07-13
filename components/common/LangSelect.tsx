/** @jsx jsx */
import { jsx, useTheme } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from 'i18n.json';
import Select from 'react-select';

const { allLanguages } = i18nConfig

const LangSelect = () => {
  const theme = useTheme()
  const router = useRouter()
  const { t, lang } = useTranslation()

  const options = allLanguages.map(lng => ({
    value: lng, label: lng.toUpperCase()
  }))
  const defaultValue = options.filter(option => option.value === lang)[0]

  const styles = {
    control: base => ({
      ...base,
      cursor: 'pointer',
      fontSize: theme.fontSizes[1],
      width: '60px',
      border: 0,
      boxShadow: 'none',
      background: 'transparent'
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    valueContainer: () => ({margin: '0'}),
    singleValue: (base, state) => ({
      ...base,
      color: 'black',
    }),
    indicatorSeparator: () => ({display: 'none'}),
    menu: (base, state) => ({
      ...base,
      color: 'black',
      background: 'white'
    }),
    option: (base, state) => ({
      ...base,
      cursor: 'pointer',
      fontSize: theme.fontSizes[1],
      color: state.isSelected ? theme.colors.text : theme.colors.accent5,
      background: state.isSelected ? theme.colors.redTransparent : 'transparent',
    })
  };

  function handleChange(lng) {
    const regex = new RegExp(`^/(${allLanguages.join('|')})`)
    router.push(router.pathname.replace(regex, `/${lng.value}`), router.asPath.replace(regex, `/${lng.value}`))
  }

  return (
    <Select
      inputId="lang-select"
      isSearchable={false}
      onChange={handleChange}
      defaultValue={defaultValue}
      placeholder={lang.toUpperCase()}
      options={options}
      styles={styles}
    />
  )
}

export default LangSelect