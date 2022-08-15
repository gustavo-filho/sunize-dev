import { Loader } from '../loader/loader.component';
import { LoaderContainer } from './loader.styles';

export const PageLoader = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};
