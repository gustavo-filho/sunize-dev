import { useStyles } from '@domain/dashboard/products/create-product-wrapper/create-products-wrapper.styles';
import CourseImage from '../assets/images/course.png';
import PackageImage from '../assets/images/pacote.png';
import Ebook from '../assets/images/ebook.png';

export const CreateProductWrapper = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.titleBox}>
          <h2 className={classes.title}>O QUE DESEJA CRIAR?</h2>
        </div>
        <div className={classes.mainContent}>
          <div className={classes.contentBox}>
            <img src={CourseImage} />
            <p className={'title'}>Curso Online</p>
            <p>Produza cursos incríveis na plataforma mais segura do mercado</p>
          </div>{' '}
          <div className={classes.contentBox}>
            <img src={Ebook} />
            <p className={'title'}>E-book</p>
            <p>Lance seu livro digital de forma simplificada</p>
          </div>{' '}
          <div className={classes.contentBox}>
            <img src={PackageImage} />
            <p className={'title'}>Pacote</p>
            <p>Produza cursos incríveis na plataforma mais segura do mercado</p>
          </div>
        </div>
      </div>
    </div>
  );
};
