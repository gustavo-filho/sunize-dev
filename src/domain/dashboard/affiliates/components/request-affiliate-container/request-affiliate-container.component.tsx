import { TabPanel } from '@domain/dashboard/affiliates/components/tab-panel/tab-panel.component';
import { useStyles } from './request-affiliate-container.styles';
import { useCallback, useEffect, useState } from 'react';
import { BoxAffiliate } from '@domain/dashboard/affiliates/components/box-affiliate/box-affiliate.component';
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';

type Affiliate = {
  id: number;
  affiliate: {
    id: number;
    name: string;
    photo: string | null;
  };
  approved: boolean;
  updatedAt: Date;
};
interface RequestAffiliatesContainerProps {
  activeTab: number;
  selectedProduct: any;
  user: { id: number; access_token: String };
  setTotalOfAffiliates: React.Dispatch<React.SetStateAction<number>>;
  wordToSearch: string;
  // affiliatesRequest: affiliatesRequest[]
  // totalPages: number
  // offset: number
  // setOffset: React.Dispatch<React.SetStateAction<number>>
}

export const RequestAffiliateContainer = ({
  activeTab,
  selectedProduct,
  user,
  setTotalOfAffiliates,
  wordToSearch,
}: RequestAffiliatesContainerProps) => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [offset, setOffset] = useState(0);
  const [affiliatesToExibs, setaffiliatesToExibs] = useState(affiliates);
  const classes = useStyles();

  const getAffiliates = useCallback(() => {
    api
      .get(`users/${user?.id}/affiliates/false/${selectedProduct?.id}`, {
        params: {
          page: offset,
          paginate: 10,
        },
      })
      .then(response => {
        setAffiliates(response.data.data);
        setaffiliatesToExibs(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalOfAffiliates(response.data.data.length);
      });
  }, [user?.id, selectedProduct?.id, offset, setTotalOfAffiliates]);

  const deleteAffiliate = useCallback(
    (affiliateId: string) => {
      api
        .delete(
          `users/${user?.id}/affiliates/${affiliateId}/${selectedProduct?.id}`,
        )
        .then(() => {
          toast.success('Afiliado deletado!');
          getAffiliates();
        })
        .catch(err => {
          toast.error(`Erro ao remover usuãrio. Erro: ${err}`);
        });
    },
    [getAffiliates, selectedProduct?.id, user?.id],
  );

  useEffect(() => {
    selectedProduct && getAffiliates();
  }, [getAffiliates, selectedProduct]);

  const approveAffiliate = useCallback(
    (affiliateId: string) => {
      api
        .post(`users/${user?.id}/affiliates/${affiliateId}/approve`, {
          comission: '20',
          type_comission: 'PERCENTAGE',
        })
        .then(response => {
          toast.success('Afiliado aprovado!');
          getAffiliates();
        })
        .catch(err => {
          toast.error(`Erro ao aprovar afiliado. Erro: ${err}`);
        });
    },
    [getAffiliates, user?.id],
  );

  return (
    <>
      <TabPanel value={activeTab} index={1}>
        <div className={classes.root}>
          {affiliates?.[0]
            ? affiliatesToExibs
                .filter(element => {
                  return element.affiliate.name
                    .toLowerCase()
                    .includes(wordToSearch.toLowerCase());
                })
                .map(affiliate => (
                  <BoxAffiliate
                    key={affiliate.id}
                    affiliate={affiliate}
                    deleteAffiliate={deleteAffiliate}
                    canApproveOrDeny
                    approveAffiliate={approveAffiliate}
                  />
                ))
            : 'Você não tem nenhum pedido de afiliado.'}
        </div>
      </TabPanel>
      {totalPages > 1 && (
        <div className={classes.paginationContainer}>
          <Pagination
            totalPages={totalPages}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      )}
    </>
  );
};
