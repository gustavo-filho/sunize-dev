import { useFetch } from '@domain/dashboard/market/config/useFetch.config';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Container } from './box-affiliates.styles';

interface BoxAffiliatesProps {
  user: any;
  affiliates: any;
}

export const BoxAffiliates = ({ user, affiliates }: BoxAffiliatesProps) => {
  const [affiliateUser, setAffiliateUser] = useState<any>({
    account_type: '',
    email: '',
    id: 0,
    name: '',
    photo: '',
  });
  const affiliate_fetch = useFetch(
    `admin/${user.id}/users/${affiliates.affiliate_id}`,
  );

  const { data: affiliate_product } = useFetch(
    `products/${affiliates.product_id}`,
  );

  useEffect(() => {
    if (affiliate_fetch.data) {
      setAffiliateUser(affiliate_fetch.data.data.user);
    }
  }, [affiliate_fetch]);

  return (
    <Container href={affiliate_product?.link_external || '#'} target="_blank">
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
            Produto: {affiliate_product?.data?.product?.title}
          </p>
        </div>
      </div>
    </Container>
  );
};
