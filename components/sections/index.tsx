import Hero from 'components/sections/hero';
import PageHero from 'components/sections/page-hero';
import Contact from 'components/sections/contact';
import Article from 'components/sections/article';
import ArticlesSearch from 'components/sections/articles/search';
import ArticlesCarousel from 'components/sections/articles/carousel';

export default function Sections({ sections }) {
  return (
    <>
      {sections.map(section => {
        if (section.template === 'hero'){
          return (
            <Hero 
              key={section.template}
              title={section.title}
              description={section.description}
              image={section.image}
            />
          )
        }
        if (section.template === 'page-hero'){
          return (
            <PageHero
              key={section.template}
              {...section}
            />
          )
        }
        if (section.template === 'article'){
          return (
            <Article
              key={section.template} 
              {...section.article}
            />
          )
        }
        if (section.template === 'contact-section'){
          return (
            <Contact
              key={section.template}
              {...section}
            />
          )
        }
        if (section.template === 'articles-search'){
          return (
            <ArticlesSearch
              key={section.template} 
              {...section}
            />
          )
        }
        if (section.template === 'articles-carousel'){
          return (
            <ArticlesCarousel
              key={section.template} 
              {...section}
            />
          )
        }
      })}
    </>
  )
}