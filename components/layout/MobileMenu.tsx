import {
  Flex,
  List,
  ListItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core"
import { Button } from 'components/common/Button';
import Link from 'next-translate/Link';
import { AiOutlineMenu } from 'react-icons/ai';


export default ({ logo, links }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>
        <AiOutlineMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay zIndex="modal"/>
        <DrawerContent zIndex="modal">
          <DrawerHeader display="grid" gridTemplateColumns={'1fr 1fr'}>
            <Flex alignItems="center" justifyContent="flex-start">
              {logo}
            </Flex>
            <Flex alignItems="center" justifyContent="flex-end">
              <DrawerCloseButton position="relative" top="0"/>
            </Flex>
          </DrawerHeader>
          <DrawerBody sx={{ display: 'flex', alignItems: 'center'}}>
            <List width="100%">
              {links.map(link => (
                <ListItem key={link.url} width="100%">
                  <Link href={link.url}>
                    <Button width="100%" fontSize={5}>{link.text}</Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          </DrawerBody>
          <DrawerFooter/>
        </DrawerContent>
      </Drawer>
    </>
  )
}