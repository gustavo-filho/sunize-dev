import React, { useCallback, useState } from 'react';
import { FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Formik, Form, Field as FieldFormik, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { listBanks } from '../../listBanks';
import { listCountries } from './list-coutries';
import {
  Container,
  ContentModal,
  FormGroup,
  FormGroupTop,
  Overlay,
  InputRadio,
  AccountFields,
  Errors,
  Error,
  PersonType,
} from './modal-add-account-styles';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { SingleSelect } from '@shared/components/select/select.component';
import { formatCountries } from '@shared/utils/formatCountries';
import { useAppSelector } from '../../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { api } from '@shared/services/api';
import { SelectBank } from '@domain/dashboard/components/select-bank-component/select-bank-component';
import { schema } from './modal-add-account-schema';
import { InputCpfOrCnpj } from '@shared/components/input-cpf-or-cnpj-component/input-cpf-or-cnpj-component';
import { addAcountTypeValues } from '../../types/modal-add-account-values-types';
import { InputMaskedModalAddAccount } from './input-masked-add-account/input-masked-modal-add-account';
import { subAccountTypesValues } from '../../types/sub-account-types';
import { modalAddAccountComponentValue } from '../../types/modal-add-account-component.types';

export function ModalAddAccount({
  modal,
  setModal,
}: modalAddAccountComponentValue): JSX.Element {
  const user = useAppSelector(userSelector);
  const [isCpf, setIsCpf] = useState(true);
  const countriesFormated = formatCountries(listCountries);
  const [statusGetLocation, setStatusGetLocation] = useState('nottried');

  const getLocation = useCallback((value: string, setFieldValue: any) => {
    const cep = value.replace(/[-_]/g, '');
    if (cep.length === 8) {
      setStatusGetLocation('trying');
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res: AxiosResponse<any, any>) => {
          if (!res.data.erro) {
            setStatusGetLocation('success');
            setFieldValue('street', res.data.logradouro);
            setFieldValue('complement', res.data.complemento);
            setFieldValue('cityName', res.data.localidade);
            setFieldValue('stateInitials', res.data.uf);
            setFieldValue('countryName', 'Brasil');
            setFieldValue('district', res.data.bairro);
          }
        });
    }
  }, []);

  const onSubmit = useCallback(
    async (values: addAcountTypeValues) => {
      if (isCpf) {
        values.cnpj = '';
      } else {
        values.cpf = '';
      }

      let zipCode: string = values.zipCode;
      zipCode = String(zipCode).replace(/[-_]/g, '');

      const subAccount: subAccountTypesValues = {
        account: {
          Identity: values.cpf ? values.cpf : values.cnpj,
          BankData: {
            Bank: {
              Code: values.bank,
            },
            BankAgency: values.agency,
            BankAgencyDigit: values.digit,
            BankAccount: values.account,
            BankAccountDigit: values.digit,
            AccountType: {
              Code: values.accountType,
            },
          },
          Address: {
            ZipCode: zipCode,
            Street: values.street,
            Number: values.number,
            Complement: values.complement,
            District: values.district,
            CityName: values.cityName,
            StateInitials: values.stateInitials,
            CountryName: values.countryName,
          },
        },
      };

      try {
        await api.post(
          `/users/${user.data.id}/safe2pay/sub-accounts`,
          subAccount,
          {
            headers: { 'sunize-access-token': user.data.access_token },
          },
        );
        toast.success('Sua conta foi cadastrada!');
        setModal(false);
      } catch (error) {
        toast.error(
          'Ocorreu um erro ao tentar cadastrar sua conta, favor entrar em contato com o suporte!',
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user.data.id, user.data.access_token, isCpf],
  );

  const addAcountDefaultValue: addAcountTypeValues = {
    bank: '',
    favoredName: '',
    personType: 'PF',
    cpf: '',
    cnpj: '',
    accountType: '',
    agency: '',
    account: '',
    digit: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    cityName: '',
    stateInitials: '',
    countryName: '',
  };

  const validate = useCallback(
    (values: addAcountTypeValues) => {
      const errors = {};
      const agencyValue = values.agency.replaceAll('_', '');
      const accountValue = values.account.replaceAll('_', '');
      const digitValue = values.digit.replaceAll('_', '');
      const zipCodeValue = values.zipCode.replaceAll('_', '');
      const stateInitialsValue = values.stateInitials.replaceAll('_', '');
      const numberValue = values.number.replaceAll('_', '');

      if (values.bank === 'Nome do Banco' || !values.bank)
        // @ts-ignore
        errors.bank = 'Selecione o nome do Banco';

      if (agencyValue.length < 4) {
        // @ts-ignore
        errors.agency = 'Agência inválida';
      }

      if (accountValue.length < 5) {
        // @ts-ignore
        errors.account = 'Conta inválida';
      }

      if (digitValue.length < 1) {
        // @ts-ignore
        errors.digit = 'Digito inválida';
      }

      if (zipCodeValue.length < 8) {
        // @ts-ignore
        errors.zipCode = 'CEP inválido';
      }

      if (numberValue.length < 1) {
        // @ts-ignore
        errors.number = 'Número inválido';
      }

      if (stateInitialsValue.length < 2) {
        // @ts-ignore
        errors.stateInitials = 'UF inválido';
      }

      if (isCpf) {
        const cpfValid = values.cpf
          .replaceAll('.', '')
          .replaceAll('_', '')
          .replace('-', '');

        if (cpfValid.length < 11) {
          // @ts-ignore
          errors.cpf = 'CPF inválido';
        }
      } else {
        const cnpjValid = values.cnpj
          .replaceAll('.', '')
          .replaceAll('_', '')
          .replace('/', '')
          .replace('-', '');
        if (cnpjValid.length < 14) {
          // @ts-ignore
          errors.cnpj = 'CNPJ inválido';
        }
      }
      return errors;
    },
    [isCpf],
  );

  return (
    <>
      {modal && (
        <Container>
          <ContentModal>
            <button>
              <FaTimes onClick={() => setModal(!modal)} />
            </button>

            <h1>Cadastrar Conta</h1>

            <Formik
              initialValues={{
                ...addAcountDefaultValue,
              }}
              onSubmit={onSubmit}
              validate={validate}
              validationSchema={schema}
              validateOnChange
              validateOnBlur
              render={({ errors, touched, setFieldValue }) => (
                <Form>
                  <SelectBank
                    defaultName="Nome do Banco"
                    options={listBanks}
                    valueBeforeName
                    fieldName="bank"
                    setFieldValue={setFieldValue}
                  />

                  <FormGroupTop>
                    <FieldFormik
                      id="favoredName"
                      name="favoredName"
                      placeholder="Nome do Favorecido"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setFieldValue('favoredName', event.target.value);
                      }}
                    />
                  </FormGroupTop>

                  <FormGroupTop>
                    <PersonType>
                      <div>
                        <FieldFormik
                          onClick={() => {
                            setIsCpf(true);
                            setFieldValue('cnpj', '');
                          }}
                          type="radio"
                          name="personType"
                          id="physical"
                          value="PF"
                        />
                        <label
                          htmlFor="physical"
                          onClick={() => setIsCpf(true)}
                        >
                          Pessoa Física
                        </label>
                      </div>

                      <div>
                        <FieldFormik
                          onClick={() => {
                            setIsCpf(false);
                            setFieldValue('cpf', '');
                          }}
                          type="radio"
                          name="personType"
                          id="juridic"
                          value="PJ"
                        />
                        <label
                          htmlFor="juridic"
                          onClick={() => setIsCpf(false)}
                        >
                          Pessoa Jurídica
                        </label>
                      </div>
                    </PersonType>

                    {isCpf ? (
                      <InputCpfOrCnpj
                        id="cpf"
                        name="cpf"
                        mask="999.999.999-99"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('cpf', event.target.value)}
                        placeholder="Digite seu CPF"
                        value={undefined}
                      />
                    ) : (
                      <InputCpfOrCnpj
                        id="cnpj"
                        name="cnpj"
                        mask="99.999.999/9999-99"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('cnpj', event.target.value)}
                        placeholder="Digite seu CNPJ"
                        value={undefined}
                      />
                    )}
                  </FormGroupTop>

                  <h4>Tipo de Conta</h4>

                  <FormGroup>
                    <InputRadio>
                      <FieldFormik
                        type="radio"
                        id="current"
                        name="accountType"
                        value="CURRENT_ACCOUNT"
                      />
                      <label htmlFor="current">Conta Corrente</label>
                    </InputRadio>

                    <InputRadio>
                      <FieldFormik
                        type="radio"
                        id="savings"
                        name="accountType"
                        value="SAVINGS_ACCOUNT"
                      />
                      <label htmlFor="SAVINGS_ACCOUNT">Conta Poupança</label>
                    </InputRadio>
                  </FormGroup>

                  <AccountFields>
                    <InputMask
                      name="agency"
                      placeholder="Agência"
                      mask="9999"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue('agency', event.target.value)
                      }
                    ></InputMask>

                    <InputMask
                      name="account"
                      placeholder="Conta"
                      mask="99999999"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue('account', event.target.value)
                      }
                    ></InputMask>

                    <InputMask
                      name="digit"
                      placeholder="Digito"
                      mask="9"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue('digit', event.target.value)
                      }
                    ></InputMask>
                  </AccountFields>

                  <h1>Informações de endereço</h1>

                  <SingleSelect
                    id="countryName"
                    options={countriesFormated}
                    label="Selecione seu pais"
                    onChange={({ value }) => {
                      setFieldValue('countryName', value);
                    }}
                    placeholder="Selecione seu pais"
                    customTheme={{
                      primary25: 'rgba(236, 153, 58, 0.25)',
                      primary50: 'rgba(236, 153, 58, 0.5)',
                      primary: 'rgba(236, 153, 58, 1)',
                    }}
                  />

                  <InputMaskedModalAddAccount
                    mask="99999-999"
                    name="zipCode"
                    text="Informe seu CEP"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('zipCode', event.target.value);
                      getLocation(event.target.value, setFieldValue);
                    }}
                    placeholder="CEP"
                  />

                  {statusGetLocation === 'trying' ? (
                    <DotsLoader />
                  ) : statusGetLocation === 'nottried' ? (
                    ''
                  ) : (
                    <>
                      <InputMaskedModalAddAccount
                        mask=""
                        name="street"
                        text="Informe o nome da rua da sua residência"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('street', event.target.value)}
                        placeholder="Rua da residência"
                      />

                      <InputMaskedModalAddAccount
                        mask="999999"
                        name="number"
                        text="Informe o número da sua residência"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setFieldValue('number', event.target.value);
                        }}
                        placeholder="Número da residência"
                      />

                      <InputMaskedModalAddAccount
                        mask=""
                        name="complement"
                        text="Complemento (Opcional)"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('complement', event.target.value)}
                        placeholder="Digite um complemento para sua residência"
                      />

                      <InputMaskedModalAddAccount
                        mask=""
                        name="district"
                        text="Informe o bairro da sua residência"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('district', event.target.value)}
                        placeholder="Bairro da residência"
                      />

                      <InputMaskedModalAddAccount
                        mask=""
                        name="cityName"
                        text="Informe a cidade da sua residência"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('cityName', event.target.value)}
                        placeholder="Cidade da residência"
                      />

                      <InputMaskedModalAddAccount
                        name="stateInitials"
                        text="Informa a sigla do estado da residência"
                        mask="aa"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setFieldValue('stateInitials', event.target.value)}
                        placeholder="UF da Residência"
                      />
                    </>
                  )}

                  <Error>
                    <ErrorMessage name="countryName" />
                  </Error>

                  <Errors>
                    {errors.bank && touched.bank && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;
                        {errors.bank}
                      </p>
                    )}

                    {errors.favoredName && touched.favoredName && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;
                        {errors.favoredName}
                      </p>
                    )}

                    {errors.cpf && touched.cpf && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;
                        {errors.cpf}
                      </p>
                    )}

                    {errors.cnpj && touched.cnpj && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;
                        {errors.cnpj}
                      </p>
                    )}

                    {errors.accountType && touched.accountType && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;&nbsp;
                        {errors.accountType}
                      </p>
                    )}

                    {errors.agency && touched.agency && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;&nbsp;
                        {errors.agency}
                      </p>
                    )}

                    {errors.account && touched.account && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;&nbsp;
                        {errors.account}
                      </p>
                    )}

                    {errors.digit && touched.digit && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;&nbsp;
                        {errors.digit}
                      </p>
                    )}
                  </Errors>

                  <FormGroup>
                    <button type="submit">Cadastrar Conta</button>
                  </FormGroup>
                </Form>
              )}
            />
          </ContentModal>
          <Overlay onClick={() => setModal(!modal)}></Overlay>
        </Container>
      )}
    </>
  );
}
