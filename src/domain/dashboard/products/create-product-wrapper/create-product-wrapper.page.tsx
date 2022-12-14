import { useStyles } from '@domain/dashboard/products/create-product-wrapper/create-products-wrapper.styles';
import CourseImage from '../assets/images/course.png';
import PackageImage from '../assets/images/pacote.png';
import { Link } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';

export const CreateProductWrapper = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.titleBox}>
          <h1 className={classes.title}>O que deseja criar?</h1>
          <h2 className={classes.subtitle}>
            Nesta seção você poderá criar cursos onlines e/ou pacotes de cursos.
          </h2>
        </div>

        <div className={classes.mainContent}>
          <Link
            to={DASHBOARD_ROUTES.CREATE_COURSE}
            className={classes.contentBox}
          >
            <img alt={'imagem do curso'} src={CourseImage} />
            <p className={'title'}>Curso Online</p>
            <p>Produza cursos incríveis na plataforma mais segura do mercado</p>
          </Link>
          {/*<Link
            to={DASHBOARD_ROUTES.CREATE_COURSE}
            className={classes.contentBox}
          >
            <img alt={'imagem do ebook'} src={Ebook} />
            <p className={'title'}>e-Book</p>
            <p>Lance seu livro digital de forma simplificada</p>
          </Link>*/}
          <Link
            to={DASHBOARD_ROUTES.CREATE_PACKAGE}
            className={classes.contentBox}
          >
            <img alt={'imagem do pacote'} src={PackageImage} />
            <p className={'title'}>Pacote</p>
            <p>Produza cursos incríveis na plataforma mais segura do mercado</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
