import { useStyles } from '@domain/dashboard/products/my-content/my-content.styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './my-content.styles.css';
import { Content } from '@domain/dashboard/products/my-content/components/content/content.component';

export const MyContent = () => {
  const classes = useStyles();

  const product = {
    title: 'Um título',
    description: 'Uma descrição',
    img: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <h2 className={classes.title} style={{ fontSize: '2rem' }}>
          PAINEL DO ALUNO
        </h2>
        <div className={classes.mainContent}>
          <h2 className={classes.title} style={{ width: '100%' }}>
            Meus produtos
          </h2>
          <Carousel
            responsive={responsive}
            centerMode={true}
            sliderClass={'react-multi-carousel-track'}
          >
            {Array(12)
              .fill(product)
              .map(el => (
                <Content
                  key={el.title}
                  image={
                    'https://cdn.cademi.com.br/cache/bkJT4aMHHwr9isatDfIpbHKsJH6iJgHDsUPJAFdk-550x550-resized.jpg'
                  }
                />
              ))}
          </Carousel>
        </div>
        <div className={classes.mainContent}>
          <h2 className={classes.title} style={{ width: '100%' }}>
            Meus pacotes
          </h2>
          <Carousel
            responsive={responsive}
            centerMode={true}
            sliderClass={'react-multi-carousel-track'}
          >
            {Array(3)
              .fill(product)
              .map(el => (
                <Content
                  key={el.title}
                  image={
                    'https://cdn.cademi.com.br/cache/Babrpv1we3fU0xKUOS9lXpvZar3usmnDx7DWG2kz-550x550-resized.jpg'
                  }
                  {...{ style: { filter: 'grayscale(1)' } }}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
