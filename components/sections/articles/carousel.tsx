import { useRef, useState } from 'react';
import { Box, Grid, Flex, Heading, Button } from '@chakra-ui/react';
import { Container } from 'components/layout/Container';
import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.css';
import ArticleCard from 'components/common/ArticleCard';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import NextLink from 'next/link';

export default function ArticlesCarousel({ title, articles, button = null }) {
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const params = {
    on: {
      'progress': (swiper, progress) => {
        setProgress(progress)
      }
    },
    observer: true,
    breakpoints: {
      640: {
        slidesPerView: 3.6,
        slidesPerGroup: 2,
        spaceBetween: 50,
        slidesOffsetBefore: 100,
        slidesOffsetAfter: 100,
      },
      320: {
        freeMode: true,
        slidesPerView: 1.4,
        spaceBetween: 30,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
      }
    },
  }

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const stylesSwiper = {
    '.swiper-slide': { 
      height: 'auto',
    }
  }

  return (
    <Container size="defaultPX0">
      <Container as="div" size="defaultPY0">
        <Heading as="h2" textStyle="h2">{title}</Heading>
      </Container>
      <Box sx={stylesSwiper}>
        <Swiper ref={swiperRef} {...params}>
          {articles.map(article => (
            <Box key={article.slug} my="10">
              <ArticleCard {...article} />
            </Box>
          ))}
        </Swiper>
      </Box>
      <Box sx={{
        display: ['none', 'block'],
        'button': {
          top: '50%',
          position: 'absolute',
          zIndex: 1
        }
      }}>
        {progress !== 0 &&
          <Button onClick={goPrev} left="3">
            <FiChevronLeft />
          </Button>
        }
        {progress !== 1 &&
          <Button onClick={goNext} right="3">
            <FiChevronRight />
          </Button>
        }
      </Box>
      {button &&
        <Flex justifyContent="center">
          <NextLink href={button.url}>
            <Button variant={button.variant}>{button.text}</Button>
          </NextLink>
        </Flex>
      }
    </Container>
  )
}