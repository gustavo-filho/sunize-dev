import { useStyles } from '@domain/dashboard/products/my-content/my-content.styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
          <h2
            className={classes.title}
            style={{ width: '100%', marginLeft: '1.8rem' }}
          >
            Meus produtos
          </h2>
          <Carousel responsive={responsive} centerMode={true}>
            {Array(7)
              .fill(product)
              .map(el => (
                <Content
                  key={el.title}
                  title={'Um título'}
                  description={'Uma descrição'}
                  image={
                    'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                  }
                />
              ))}
          </Carousel>
        </div>
        <div className={classes.mainContent}>
          <h2
            className={classes.title}
            style={{ width: '100%', marginLeft: '1.8rem' }}
          >
            Meus pacotes
          </h2>
          <Carousel responsive={responsive} centerMode={true}>
            {Array(3)
              .fill(product)
              .map(el => (
                <Content
                  key={el.title}
                  title={'Um título'}
                  description={'Uma descrição'}
                  image={
                    'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
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
