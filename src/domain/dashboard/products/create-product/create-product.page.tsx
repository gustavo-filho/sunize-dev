// @ts-nocheck

import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import selectImage from '../assets/images/select-image.png';
import {
  BoxWrapper,
  Clear,
  Container,
  ContainerBox,
  FormGroup,
  OptionSingle,
  W100,
  W50
} from './create-product.styles';

import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { Dropzone } from '@domain/dashboard/products/components/dropzone/dropzone.component';
import {
  ASYNC_GET_CATEGORIES,
  productSelector
} from '@domain/dashboard/products/products.store';
import { round } from 'lodash';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { schema } from './create-product.validation';

export const CreateProduct = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(productSelector).categories;
  const [image, setImage] = useState({ uploadedFiles: [] });
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [price, setPrice] = useState('');

  useEffect(() => {
    dispatch(ASYNC_GET_CATEGORIES());
  }, [dispatch]);

  const onSubmit = useCallback(
    (values: any, actions: any) => {
      const value = round(values.price, 2);
      const dadosForm = new FormData();
      dadosForm.append('title', values.title);
      dadosForm.append('description', values.description);
      dadosForm.append('currency', values.currency);
      // @ts-ignore
      dadosForm.append('price', value);
      dadosForm.append('product_type', 'ONLINE_COURSE');
      dadosForm.append('charge_type', values.charge_type);

      // @ts-ignore
      dadosForm.append('categories', [values.category]);
      // @ts-ignore
      dadosForm.append('commission', 0);
      dadosForm.append(
        'membership_period',
        values.charge_type === 'RECURRENT' && values.charge_type,
      );
      image.uploadedFiles[0] &&
        dadosForm.append('image', image.uploadedFiles[0].file);

      api
        .post(`users/${user!.id}/products`, dadosForm, {
          headers: { 'sunize-access-token': user!.access_token },
        })
        .then(response => {
          toast.success(
            'O curso foi enviado para análise, aguarde nossa resposta.',
            {
              position: 'top-right',
            },
          );

          navigate(`/dashboard/meus-produtos/criados`);
          actions.setSubmitting(false);
        })
        .catch(err => {
          toast.error('Ocorreu um erro ao tentar enviar o produto.', {
            position: 'top-right',
          });

          actions.setSubmitting(false);
        });
    },
    [image.uploadedFiles, user, navigate],
  );

  const validate = useCallback((values: any) => {
    const errors = {};

    if (!values.price) {
      // @ts-ignore
      errors.price = 'Você precisa definir um valor';
    }

    return errors;
  }, []);

  return (
    <Container>
      <h1>Informações sobre o curso</h1>
      <h2>
        Preencha com muita atenção estes dados, eles dirão tudo sobre seu
        produto.
      </h2>

      <BoxWrapper>
        <Formik
          onSubmit={onSubmit}
          validate={validate}
          validationSchema={schema}
          validateOnChange
          initialValues={{
            title: '',
            description: '',
            charge_type: 'ONE_TIME',
            currency: 'BRL',
            category: 0,
            price: '',
            subscription_time: 'MENSAL',
          }}
          render={({ isValid, isSubmitting, errors }) => (
            <Form>
              <ContainerBox>
                <W50>
                  <FormGroup>
                    <label className="alignCenter">Imagem do seu produto</label>
                    <Dropzone
                      title={
                        <p>
                          Arraste para cá <br /> - ou -
                        </p>
                      }
                      errorTitle={
                        'Arquivo não permitido / Arquivos múltiplos não permitidos'
                      }
                      accept="image/jpeg, image/png, image/jpg"
                      sizeKB={5242880}
                      img={selectImage}
                      files={image}
                      setFiles={setImage}
                    />
                  </FormGroup>
                </W50>

                <W50>
                  <FormGroup>
                    <label>Título do seu produto</label>
                    <Field
                      name="title"
                      placeholder="Digite o nome do seu produto"
                    />
                    <p>
                      <ErrorMessage name="title" />
                    </p>
                  </FormGroup>

                  <FormGroup>
                    <label>Descrição do seu produto</label>
                    <Field
                      name="description"
                      as="textarea"
                      placeholder="Deixe uma breve descrição a respeito do seu produto"
                    />
                    <p>
                      <ErrorMessage name="description" />
                    </p>
                  </FormGroup>
                </W50>

                <W50>
                  <OptionSingle>
                    <h1 className="optionTitle">Tipo de cobrança</h1>
                    <main>
                      <div>
                        <Field
                          type="radio"
                          name="charge_type"
                          id="charge_type_ONE_TIME"
                          value="ONE_TIME"
                          onClick={() => setIsRecurrent(false)}
                        />
                        <label
                          htmlFor="charge_type_ONE_TIME"
                          onClick={() => setIsRecurrent(false)}
                        >
                          Cobrança Única
                        </label>
                      </div>

                      <div>
                        <Field
                          type="radio"
                          name="charge_type"
                          id="charge_type_RECURRENT"
                          value="RECURRENT"
                          onClick={() => setIsRecurrent(true)}
                        />
                        <label
                          htmlFor="charge_type_RECURRENT"
                          onClick={() => setIsRecurrent(false)}
                        >
                          Cobrança Recorrente
                        </label>
                      </div>
                    </main>
                  </OptionSingle>

                  {isRecurrent && (
                    <OptionSingle>
                      <h1 className="optionTitle">
                        Escolher período de adesão
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
                </W50>

                <W50>
                  <FormGroup>
                    <label>Categoria</label>
                    <Field name="category" as="select">
                      <option value="" defaultValue>
                        Selecione uma categoria
                      </option>

                      {categories &&
                        categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                    </Field>
                    <p>
                      <ErrorMessage name="category" />
                    </p>
                  </FormGroup>

                  <FormGroup>
                    <label>Preço</label>
                    <Field
                      name="price"
                      render={({ field }) => (
                        <CurrencyInput
                          {...field}
                          id="value"
                          placeholder="0.00"
                          decimalScale={2}
                          onValueChange={value => setPrice(value)}
                          value={price}
                          decimalSeparator="."
                          groupSeparator=","
                        />
                      )}
                    />
                    {errors.price && <p>{errors.price}</p>}
                    <small>Ex: 56000</small>
                  </FormGroup>
                </W50>

                <W100>
                  <FormGroup>
                    {isSubmitting ? (
                      <button type="submit" disabled>
                        Enviando...
                      </button>
                    ) : (
                      <button type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting
                          ? 'Enviando...'
                          : !isValid
                          ? 'Campos Faltando'
                          : isValid && 'Cadastrar'}
                      </button>
                    )}
                  </FormGroup>
                </W100>

                <Clear />
              </ContainerBox>
            </Form>
          )}
        />
        <CopyrightFooter />
      </BoxWrapper>
    </Container>
  );
};
