import { useMemo } from 'react';
import { UserData } from '../../modal.types';
import { BoxProduct } from './components/box-product/box-product.component';
import { Container } from './products.styles';

interface UserProps {
  userData: UserData;
  closeModal: () => void;
}

export const Products = ({ userData }: UserProps) => {
  const profitConverted = useMemo(() => {
    const profit = userData.profit.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })

    return profit
  }, [userData.profit])

  return (
    <Container>
      <h1>
        Vendas totais <b>({userData.sales})</b>
      </h1>
      <p>
        Lucro: <b>{profitConverted}</b>
      </p>

      <h1>
        Cursos Produzidos <b>({userData.user.products?.length || '0'})</b>
      </h1>
      <section>
        {userData.user.products &&
          userData.user.products.map((product) => (
            <BoxProduct block key={product.id} product={product} />
          ))}
      </section>

      <h1>
        Cursos Adquiridos <b>({userData.user.purcharses?.length || '0'})</b>
      </h1>
      <section>
        {userData.user.purcharses &&
          userData.user.purcharses.map((purcharse) => (
            <BoxProduct key={purcharse.id} product={purcharse} />
          ))}
      </section>
    </Container>
  )
};
