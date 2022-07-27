import { DASHBOARD_ROUTES } from '@domain/dashboard/components/dashboard-wrapper/dashboard-wrapper.constants';
import { Link } from 'react-router-dom';
import { useStyles } from '@domain/dashboard/products/my-content/components/content/content.styles';

interface ContentProps {
  image: string;
}

export const Content = ({ image, ...rest }: ContentProps) => {
  const classes = useStyles();
  return (
    <Link
      to={DASHBOARD_ROUTES.MY_PACKAGES}
      className={classes.contentBox}
      {...rest}
    >
      <img alt={'imagem do ebook'} src={image} />
    </Link>
  );
};
