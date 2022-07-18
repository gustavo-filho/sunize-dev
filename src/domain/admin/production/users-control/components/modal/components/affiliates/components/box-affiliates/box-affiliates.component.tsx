import { api } from '@shared/services/api';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Container } from './box-affiliates.styles';

interface BoxAffiliatesProps {
  user: any;
  affiliates: any;
}

export const BoxAffiliates = ({ user, affiliates }: BoxAffiliatesProps) => {
  const [affiliateProduct, setAffiliateProduct] = useState<any>({});
  const [affiliateUser, setAffiliateUser] = useState<any>({
    account_type: '',
    email: '',
    id: 0,
    name: '',
    photo: '',
  });

  const getAffiliatesData = useCallback(async () => {
    const responseUser = await api.get(
      `admin/${user.id}/users/${affiliates.affiliate_id}`,
    );
    const dataUser = responseUser.data;

    const responseProduct = await api.get(`products/${affiliates.product_id}`);
    const dataProduct = responseProduct.data;

    if (dataUser.success && dataProduct.success) {
      setAffiliateUser(dataUser.data.user);
      setAffiliateProduct(dataProduct.data.product);
      return;
    }

    return toast.error('Erro ao buscar dados do afiliado');
  }, [user, affiliates]);

  useEffect(() => {
    getAffiliatesData();
  }, [getAffiliatesData]);

  return (
    <Container href={affiliateProduct?.link_external || '#'} target="_blank">
      <div>
        {affiliateUser && affiliateUser.photo ? (
          <img src={affiliateUser?.photo} alt={affiliateUser?.name} />
        ) : (
          <h3>
            <FaUser />
          </h3>
        )}
        <div>
          <strong>
            {affiliateUser?.name} (ID {affiliates.affiliate_id})
          </strong>
          <p>
            ID {affiliates.id} - Afiliado em{' '}
            {moment(affiliates.createdAt).format('DD/MM/YYYY')}
            <br />
            Produto: {affiliateProduct?.title}
          </p>
        </div>
      </div>
    </Container>
  );
};
