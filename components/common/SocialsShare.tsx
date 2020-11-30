import { Box, Icon, Flex, Text, List, ListItem } from '@chakra-ui/react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { useRouter } from 'next/router';
import { FaFacebook, FaLinkedin, FaTwitter, FaPinterest } from 'react-icons/fa';

const siteName = "https://angulaire.io"

type IProps = {
  title: string;
  description?: string;
  media?: string;
  facebook?: boolean;
  linkedin?: boolean;
  twitter?: boolean;
  pinterest?: boolean;
}

export default function SocialsShare({ title, description, media, facebook=false, linkedin=false, twitter=false, pinterest=false }: IProps) {
  const { locale, asPath } = useRouter()
  const url = `${siteName}/${locale + asPath}`
  return (
    <Flex>
      <Text fontWeight="bold">Share</Text>
      <List display="flex" ml="5">
        {facebook &&
          <ListItem mr="3">
            <FacebookShareButton
              url={url}
              quote={title}
            >
              <Icon as={FaFacebook} w={5} h={5} />
            </FacebookShareButton>
          </ListItem>
        }
        {linkedin &&
          <ListItem mr="3">
            <LinkedinShareButton
              url={url}
              title={title}
              summary={description}
              source={siteName}
            >
              <Icon as={FaLinkedin} w={5} h={5} />
            </LinkedinShareButton>
          </ListItem>
        }
        {twitter &&
          <ListItem mr="3">
            <TwitterShareButton
              url={url}
              title={title}
            >
              <Icon as={FaTwitter} w={5} h={5} />
            </TwitterShareButton>
          </ListItem>
        }
        {pinterest &&
          <ListItem mr="3">
            <PinterestShareButton
              url={url}
              description={description}
              media={media}
            >
              <Icon as={FaPinterest} w={5} h={5} />
            </PinterestShareButton>
          </ListItem>
        }
      </List>
    </Flex>
  )
}