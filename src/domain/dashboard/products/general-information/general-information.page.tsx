/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@shared/components/loader/loader.component';
import { api } from '@shared/services/api';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Input } from '@shared/components/input/input.component';

import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Field, Form, Formik } from 'formik';
import { round } from 'lodash';
import { toast } from 'react-toastify';
import {
  BoxWrapper,
  Container,
  LinkNonActive,
  LoaderContainer,
  Navigation,
  NotificationSingle,
  OptionSingle,
  ProductImage,
  SellLink,
  UpdateEbook,
} from './general-information.styles';
import { schema } from './general-information.validate';

import {
  FaAlignLeft,
  FaBook,
  FaBox,
  FaCheckCircle,
  FaDollarSign,
  FaImage,
} from 'react-icons/fa';

import { TextArea } from '@shared/components/text-area/text-area.component';
import { matchStrings } from '@shared/utils/matchStrings';
import { FiCamera } from 'react-icons/fi';

import { useUser } from '@shared/contexts/user-context/user.context';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { ASYNC_GET_PRODUCTS, productSelector } from '../products.store';

export function GeneralInformationPage() {
  const { id: productId } = useParams();

  const [canDownload, setCanDownload] = useState(false);
  const [fileSelected, setFileSelected] = useState('');

  const dispatch = useAppDispatch();

  const { user } = useUser();
  const products = useAppSelector(productSelector).data;

  const [textTransfer, setTextTransfer] = useState('Copiar link');

  const product = products.find(
    (product: any) => product.id === Number(productId),
  ) as any;

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user!.id }));
  }, [dispatch, user]);

  async function handleEbookChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      if (event.target.files) {
        const typeFile = event.target.files[0].type;

        if (
          matchStrings(typeFile, [
            'text/plain',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-powerpoint',
            'application/xlm',
            'application/pptx',
            'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
            'application/vnd.ms-excel',
            'application/vnd.ms-excel.sheet.macroEnabled.12',
          ])
        ) {
          const dataForm = new FormData();
          dataForm.append('ebook', event.target.files[0]);

          await api.put(
            `/users/${user?.id}/products/${productId}/ebook-upload`,
            dataForm,
          );

          event.target.files && setFileSelected(event.target.files[0].name);
        }
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      if (event.target.files) {
        const data = new FormData();
        data.append('image', event.target.files[0]);

        await api.put(`/users/${user?.id}/products/${productId}`, data);

        toast.success('Imagem atualizada com sucesso!');
      }
    } catch (err) {
      toast.error('Erro ao atualizar imagem');
    }
  }

  async function handleUpdateProduct(values: any, { setSubmitting }: any) {
    try {
      const value = round(values.price, 2);

      await api.put(`/users/${user?.id}/products/${productId}`, {
        title: values.title,
        description: values.description,
        price: value,
        commission: values.commission ?? 0,
        system_affiliate: values.affiliate_system === 'true',
        membership_period: values.subscription_time,
      });

      toast.success('Produto atualizado com sucesso!');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(
      `${window.location.origin}/payment/${product.id}`,
    );

    setTextTransfer('Link copiado!');

    setTimeout(() => {
      setTextTransfer('Copiar link');
    }, 3000);
  }, []);

  return (
    <>
      {!product ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Container>
          <h1>
            Gerenciar&nbsp;
            {product && product.product_type === 'EBOOK' ? 'eBook' : 'Produto'}
          </h1>

          <h2>
            Aqui voc?? tem o controle de todas as informa????es e configura????es de
            seu
            {product && product.product_type === 'EBOOK' ? 'eBook' : 'produto'}.
          </h2>

          <Navigation>
            <Link to={`/dashboard/informacoes-gerais/manage/${productId}`}>
              Gerenciar
            </Link>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/checkout/${productId}`}
            >
              Checkout
            </LinkNonActive>
            <LinkNonActive
              to={`/dashboard/informacoes-gerais/coproduction/${productId}`}
            >
              Coprodu????o
            </LinkNonActive>

            {/* {product && product.product_type !== 'EBOOK' && (
              <LinkNonActive
                to={`/dashboard/informacoes-gerais/video-class/${productId}`}
              >
                Video Aula
              </LinkNonActive>
            )} */}

            <LinkNonActive
              to={`/dashboard/informacoes-gerais/links/${productId}`}
            >
              Material de divulga????o
            </LinkNonActive>

            <LinkNonActive
              to={`/dashboard/informacoes-gerais/vouchers/${productId}`}
            >
              Cupons
            </LinkNonActive>

            <LinkNonActive
              to={`/dashboard/informacoes-gerais/affiliates/${productId}`}
            >
              Afiliados
            </LinkNonActive>

            <LinkNonActive
              to={`/dashboard/informacoes-gerais/pixel/${productId}`}
            >
              Pixel
            </LinkNonActive>
          </Navigation>

          <BoxWrapper>
            <Formik
              onSubmit={handleUpdateProduct}
              validationSchema={schema}
              validateOnChange
              initialValues={{
                title: product.title,
                description: product.description,
                commission: product.commission,
                price: product.price,
                affiliate_system: product.system_affiliate ? 'true' : 'false',
                subscription_time: product.membership_period,
                type_of_discount: 'fixed',
              }}
              render={({ isSubmitting, isValid, values }) => (
                <Form>
                  <ProductImage>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.image}
                        width={300}
                        height={300}
                      />
                    ) : (
                      <div>
                        <FaImage />
                      </div>
                    )}

                    <label htmlFor="productImage">
                      <FiCamera />
                      <input
                        type="file"
                        id="productImage"
                        onChange={handleImageChange}
                      />
                    </label>
                  </ProductImage>

                  {product && product.product_type === 'EBOOK' && (
                    <>
                      <UpdateEbook>
                        <label htmlFor="ebook">
                          <FaBook /> Selecione seu e-Book
                          <input
                            type="file"
                            id="ebook"
                            onChange={handleEbookChange}
                          />
                        </label>

                        {fileSelected && (
                          <span>
                            <FaCheckCircle />
                            {fileSelected}
                          </span>
                        )}
                      </UpdateEbook>

                      <NotificationSingle>
                        <h1>Deseja permitir o download do seu e-Book?</h1>
                        <main>
                          <div onClick={() => setCanDownload(true)}>
                            <input
                              name="candownload"
                              type="radio"
                              id="can_download_true"
                              defaultChecked={canDownload}
                            />
                            <label htmlFor="can_download_true">Sim</label>
                          </div>

                          <div onClick={() => setCanDownload(false)}>
                            <input
                              name="candownload"
                              type="radio"
                              id="can_download_false"
                              defaultChecked={!canDownload}
                            />
                            <label htmlFor="can_download_false">N??o</label>
                          </div>
                        </main>
                      </NotificationSingle>
                    </>
                  )}

                  <Input
                    name="title"
                    text="Nome"
                    icon={FaBox}
                    placeholder="Nome do produto"
                  />

                  <TextArea
                    name="description"
                    text="Descri????o"
                    icon={FaAlignLeft}
                    placeholder="Descri????o do produto"
                  />

                  <Input
                    name="price"
                    text="Pre??o"
                    icon={FaDollarSign}
                    placeholder="Pre??o do produto"
                  />

                  {product.charge_type === 'RECURRENT' && (
                    <OptionSingle>
                      <h1 className="optionTitle">
                        Escolher per??odo de ades??o
                      </h1>
                      <main>
                        <div>
                          <Field
                            type="radio"
                            name="subscription_time"
                            id="subscription_time_monthly"
                            value="MENSAL"
                          />
                          <label htmlFor="subscription_time_monthly">
                            Mensal
                          </label>
                        </div>

                        <div>
                          <Field
                            type="radio"
                            name="subscription_time"
                            id="subscription_time_bimonthly"
                            value="BIMESTRAL"
                          />
                          <label htmlFor="subscription_time_bimonthly">
                            Bimestral
                          </label>
                        </div>

                        <div>
                          <Field
                            type="radio"
                            name="subscription_time"
                            id="subscription_time_semester"
                            value="SEMESTRAL"
                          />
                          <label htmlFor="subscription_time_semester">
                            Semestral
                          </label>
                        </div>

                        <div>
                          <Field
                            type="radio"
                            name="subscription_time"
                            id="subscription_time_yearly"
                            value="ANUAL"
                          />
                          <label htmlFor="subscription_time_yearly">
                            Anual
                          </label>
                        </div>
                      </main>
                    </OptionSingle>
                  )}

                  {isSubmitting ? (
                    <DotsLoader style={{ marginTop: '3.5rem' }} />
                  ) : (
                    <button type="submit" disabled={!isValid || isSubmitting}>
                      {isSubmitting
                        ? 'Salvando...'
                        : !isValid
                        ? 'Campos Faltando'
                        : isValid && 'Salvar altera????es'}
                    </button>
                  )}
                </Form>
              )}
            />

            <SellLink>
              <label>Utilize este link para realizar as suas vendas:</label>
              <input
                value={`${window.location.origin}/payment/${product.id}`}
                disabled
              />
              <button onClick={handleCopyToClipboard}>{textTransfer}</button>
            </SellLink>
          </BoxWrapper>
        </Container>
      )}
    </>
  );
}
