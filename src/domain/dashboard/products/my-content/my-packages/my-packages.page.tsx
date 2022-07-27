import Carousel from 'react-multi-carousel';
import '../my-content.styles.css';

import { Content } from '@domain/dashboard/products/my-content/components/content/content.component';
import { useStyles } from '@domain/dashboard/products/my-content/my-packages/my-package.styles';
import { theme } from '@shared/styles/theme.constants';

export const MyPackages = () => {
  const classes = useStyles();
  const productPackage = {
    title: 'Um título',
    description: 'Uma descrição',
    img: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
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
          Meus produtos
        </h2>
        <div className={classes.mainContent}>
          <h2 className={classes.title} style={{ width: '100%' }}>
            Capacitação
          </h2>
          <Carousel
            responsive={responsive}
            centerMode={true}
            sliderClass={'react-multi-carousel-track'}
          >
            {Array(7)
              .fill(productPackage)
              .map(el => (
                <Content
                  key={el.title}
                  image={
                    'https://cdn.cademi.com.br/cache/Y0iuEvug0BzB2OGFpzZiTlpQynNYOy0hx2UTIS0x-550x550-resized.jpg'
                  }
                />
              ))}
          </Carousel>
        </div>
        <div className={classes.mainContent}>
          <h2 className={classes.title} style={{ width: '100%' }}>
            Outros
          </h2>
          <Carousel
            responsive={responsive}
            centerMode={true}
            sliderClass={'react-multi-carousel-track'}
          >
            {Array(3)
              .fill(productPackage)
              .map(el => (
                <Content
                  key={el.title}
                  image={
                    'https://cdn.cademi.com.br/cache/zMjsnAOglRFMuKW3sG3RTFe9xqH7kS4z7FmD9xHA-550x550-resized.jpg'
                  }
                  {...{ style: { filter: 'grayscale(1)' } }}
                />
              ))}
          </Carousel>
        </div>
        <div className={classes.mainContent}>
          <h2
            className={classes.title}
            style={{
              width: '100%',
              color: theme.colors.yellow,
              fontWeight: 'bold',
            }}
          >
            Próximas novidades
          </h2>
          <Carousel responsive={responsive} centerMode={true}>
            {Array(3)
              .fill(productPackage)
              .map(el => (
                <Content
                  key={el.title}
                  image={
                    'https://cdn.cademi.com.br/cache/YAQWmWxsawF8YnP19SEYB1h9x8lHkRA3x5pI3idR-550x550-resized.jpg'
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
