import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Select from 'components/common/Select';

const LangSelect = () => {
  const router = useRouter()
  const { t, lang } = useTranslation()

  const options = router.locales.map(lng => ({
    value: lng, label: lng.toUpperCase()
  }))

  function handleChange(lng) {
    router.push(router.asPath, router.asPath, { locale: lng.value })
  }

  return (
    <Select
      isSearchable={false}
      onChange={handleChange}
      defaultValue={router.locale}
      placeholder={lang.toUpperCase()}
      options={options}
    />
  )
}

export default LangSelect