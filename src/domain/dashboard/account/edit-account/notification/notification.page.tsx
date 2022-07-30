import { userSelector } from '@domain/auth/user/user.store';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../../store/hooks';
import {
  BoxWrapper,
  ButtonSave,
  Container,
  ContainerBox,
  LinkTab,
  Navigation,
  NotificationSingle,
} from '../edit-account.styles';

export const PersonNotificationPage = () => {
  const user = useAppSelector(userSelector);
  const [userData, setUserData] = useState<null | any>(null);

  const getUserData = useCallback(async () => {
    try {
      const { data } = await api.get(`users/${user.data.id}`);
      if (data) {
        setUserData(data.data);
      }
    } catch (error) {
      toast('Houve um problema ao carregar os dados do usuário');
    }
  }, [user]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [affiliationRequest, setAffiliationRequest] = useState<
    undefined | boolean
  >(undefined);
  const [acceptAnyAffiliationRequest, setAcceptAnyAffiliationRequest] =
    useState<undefined | boolean>(undefined);
  const [affiliateSale, setAffiliateSale] = useState<undefined | boolean>(
    undefined,
  );
  const [producerSale, setProducerSale] = useState<undefined | boolean>(
    undefined,
  );

  useEffect(() => {
    if (userData) {
      setAffiliationRequest(userData.notifications.affiliation_request);
      setAcceptAnyAffiliationRequest(userData.accept_any_affiliation_request);
      setAffiliateSale(userData.notifications.affiliate_sale);
      setProducerSale(userData.notifications.producer_sale);
    }
  }, [userData]);

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);

    const dataForm = {
      accept_any_affiliation_request: acceptAnyAffiliationRequest,
      notifications: {
        affiliate_sale: affiliateSale,
        producer_sale: producerSale,
        affiliation_request: affiliationRequest,
      },
    };

    try {
      const { data } = await api.put(`users/${user.data.id}`, dataForm);

      if (data.success) toast.success(data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }

    return setIsSubmitting;
  }, [
    acceptAnyAffiliationRequest,
    affiliateSale,
    affiliationRequest,
    producerSale,
    user,
  ]);

  return (
    <Container>
      <h1>Dados Pessoais</h1>
      <Navigation>
        <div className="links">
          <LinkTab to="/dashboard/edit-account/person-data">
            Dados pessoais
          </LinkTab>
          <LinkTab active to="/dashboard/edit-account/notification">
            Notificações
          </LinkTab>
          <LinkTab to="/dashboard/edit-account/invites">Convites</LinkTab>
        </div>
      </Navigation>
      <BoxWrapper>
        {!userData ? (
          <DotsLoader style={{ marginTop: '2rem' }} />
        ) : (
          <ContainerBox>
            <NotificationSingle>
              <h1>Deseja receber solicitações de afiliados?</h1>
              <main>
                <div onClick={() => setAffiliationRequest(true)}>
                  <input
                    name="affiliation_request"
                    type="radio"
                    id="affiliation_request_true"
                    defaultChecked={affiliationRequest}
                  />
                  <label htmlFor="affiliation_request_true">Sim</label>
                </div>

                <div onClick={() => setAffiliationRequest(false)}>
                  <input
                    name="affiliation_request"
                    type="radio"
                    id="affiliation_request_false"
                    defaultChecked={!affiliationRequest}
                  />
                  <label htmlFor="affiliation_request_false">Não</label>
                </div>
              </main>
            </NotificationSingle>

            <NotificationSingle>
              <h1>Deseja aceitar todos os pedidos de afiliação?</h1>
              <main>
                <div onClick={() => setAcceptAnyAffiliationRequest(true)}>
                  <input
                    name="accept_any_affiliation_request"
                    type="radio"
                    id="accept_any_affiliation_request_true"
                    defaultChecked={acceptAnyAffiliationRequest}
                  />
                  <label htmlFor="accept_any_affiliation_request_true">
                    Sim
                  </label>
                </div>

                <div onClick={() => setAcceptAnyAffiliationRequest(false)}>
                  <input
                    name="accept_any_affiliation_request"
                    type="radio"
                    id="accept_any_affiliation_request_false"
                    defaultChecked={!acceptAnyAffiliationRequest}
                  />
                  <label htmlFor="juridic">Não</label>
                </div>
              </main>
            </NotificationSingle>

            <NotificationSingle>
              <h1>
                Deseja receber um e-mail sobre as vendas realizadas por seus
                Afiliados?
              </h1>
              <main>
                <div onClick={() => setAffiliateSale(true)}>
                  <input
                    name="affiliate_sale"
                    type="radio"
                    id="affiliate_sale_true"
                    defaultChecked={affiliateSale}
                  />
                  <label htmlFor="affiliate_sale_true">Sim</label>
                </div>

                <div onClick={() => setAffiliateSale(false)}>
                  <input
                    name="affiliate_sale"
                    type="radio"
                    id="affiliate_sale_false"
                    defaultChecked={!affiliateSale}
                  />
                  <label htmlFor="affiliate_sale_false">Não</label>
                </div>
              </main>
            </NotificationSingle>

            <NotificationSingle>
              <h1>
                Deseja receber e-mails sobre a confirmação de suas vendas?
              </h1>
              <main>
                <div onClick={() => setProducerSale(true)}>
                  <input
                    name="producer_sale"
                    type="radio"
                    id="producer_sale_true"
                    defaultChecked={producerSale}
                  />
                  <label htmlFor="producer_sale_true">Sim</label>
                </div>

                <div onClick={() => setProducerSale(false)}>
                  <input
                    name="producer_sale"
                    type="radio"
                    id="producer_sale_false"
                    defaultChecked={!producerSale}
                  />
                  <label htmlFor="producer_sale_false">Não</label>
                </div>
              </main>
            </NotificationSingle>

            <ButtonSave>
              <button
                className="btn btn-green"
                type="submit"
                disabled={isSubmitting}
                onClick={onSubmit}
              >
                {isSubmitting ? (
                  <DotsLoader color="white" />
                ) : (
                  'Confirmar alterações'
                )}
              </button>
            </ButtonSave>
          </ContainerBox>
        )}

        <CopyrightFooter />
      </BoxWrapper>
    </Container>
  );
};
