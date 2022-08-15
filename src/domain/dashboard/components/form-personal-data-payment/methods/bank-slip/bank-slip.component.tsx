import React, { useCallback, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  Container,
  ButtonSubmit,
  Content,
  ContentGenerated,
} from './bank-slip.styles';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { api } from '@shared/services/api';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';

export function BankSlip(): JSX.Element {
  const { user } = useUser();

  const { productId } = useParams();
  const { voucherApplied } = usePayment();
  const [bankSlipLink, setBankSlipLink] = useState('');
  const [statusDescription, setStatusDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post(
        `users/${user!.id}/products/${productId}/buy/bankslip`,
        {
          buyUpsell: false,
          voucher: voucherApplied,
        },
        {
          headers: {
            'sunize-access-token': user!.access_token,
          },
        },
      );
      toast.success('Boleto gerado: Seu boleto foi gerado com sucesso! ');
      setBankSlipLink(response.data.data.url);
      setStatusDescription(response.data.data.statusDescription);
      window.open(response.data.data.url, '_blank');
    } catch (error: any) {
      toast.error(`Houve um problema! ${error.response.data.message}`);
    }
    setIsSubmitting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, user!.access_token, user!.id, voucherApplied]);

  return (
    <Container>
      {!bankSlipLink ? (
        <>
          <Content>
            <h3>INFORMAÇÕES SOBRE O PAGAMENTO VIA BOLETO</h3>

            <p>
              <div />
              <span>
                Você pode imprimir e &nbsp;<b>pagar no banco.</b>
              </span>
            </p>

            <p>
              <div />
              <span>
                <b>ou pagar pela internet</b>&nbsp; através do código de barras
              </span>
            </p>

            <p>
              <div />
              <span>
                Prazo para compensar em até &nbsp;<b>3 dias úteis.</b>
              </span>
            </p>
          </Content>
        </>
      ) : (
        <ContentGenerated>
          <h3>SEU BOLETO FOI GERADO!</h3>

          <strong>{statusDescription ?? ''}</strong>

          <p>
            Caso não tenha sido aberto automaticamente, clique no botão abaixo
            para visualizar.
          </p>

          <a href={bankSlipLink} target="_blank" rel="noreferrer">
            VISUALIZE SEU BOLETO AQUI
          </a>

          <small>Taxa para o pagamento por boleto é de R$ 2,00</small>
        </ContentGenerated>
      )}

      {!bankSlipLink && (
        <>
          <ButtonSubmit
            type="submit"
            onClick={handleSubmit}
            jump={Number(isSubmitting)}
          >
            {isSubmitting ? (
              <DotsLoader color="white" />
            ) : (
              <>
                GERAR BOLETO <FaArrowRight />
              </>
            )}
          </ButtonSubmit>
          <small>Taxa para o pagamento por boleto é de R$ 2,00</small>
        </>
      )}
    </Container>
  );
}
