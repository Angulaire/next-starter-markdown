import { Box, useStyleConfig } from '@chakra-ui/react';

export const Card = ({ variant="default", size="default", ...rest }) => {

  const styles = useStyleConfig("Card", {
    variant,
    size,
  })

  return <Box sx={styles} {...rest} />
}