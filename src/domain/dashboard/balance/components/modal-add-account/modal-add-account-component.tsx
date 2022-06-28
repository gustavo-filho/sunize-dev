import React, { useCallback, useState } from 'react'
import { FaTimes, FaTimesCircle } from 'react-icons/fa'
import { Formik, Form, Field as FieldFormik, ErrorMessage } from 'formik'
import InputMask from 'react-input-mask'
import { bankTypes } from '../../bankTypes'
import axios from 'axios'
import { listCountries } from './list-coutries'

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
} from './modal-add-account-styles'
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component'
import { Input } from '@shared/components/input/input.component'
import { SingleSelect } from '@shared/components/select/select.component'
import { formatCountries } from '@shared/utils/formatCountries'
import { useAppSelector } from '../../../../../store/hooks'
import { userSelector } from '@domain/auth/user/user.store'
import { api } from '@shared/services/api'
import { SelectBank } from '@domain/dashboard/components/select-bank-component/select-bank-component'
import { schema } from './modal-add-account-schema'
import { toast } from 'react-toastify'
import { InputCpfOrCnpj } from '@shared/components/input-cpf-or-cnpj-component/input-cpf-or-cnpj-component'
import { addAcountTypeValues } from './types/modal-add-account-values-types'
import { InputMaskedModalAddAccount } from './input-masked-add-account/input-masked-modal-add-account'

export function ModalAddAccount({ modal, setModal }: any) {
  const user = useAppSelector(userSelector);
  const [isCpf, setIsCpf] = useState(true)
  const countriesFormated = formatCountries(listCountries)

  const [statusGetLocation, setStatusGetLocation] = useState('nottried')

  const getLocation = useCallback((value: any, setFieldValue: any) => {
    const cep = value.replace(/[-_]/g, '')
    if (cep.length === 8) {
      setStatusGetLocation('trying')
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
        if (!res.data.erro) {
          setStatusGetLocation('success')
          setFieldValue('street', res.data.logradouro)
          setFieldValue('complement', res.data.complemento)
          setFieldValue('cityName', res.data.localidade)
          setFieldValue('stateInitials', res.data.uf)
          setFieldValue('countryName', 'Brasil')
          setFieldValue('district', res.data.bairro)
        }
      })
    }
  }, [])

  const onSubmit = useCallback(
    async (values: addAcountTypeValues) => {
      console.log('values', values)
      // if (isCpf === true) {
      //   values.cnpj = ''
      // } else {
      //   values.cpf = ''
      // }

      // let ZipCode = values.zipCode
      // ZipCode = String(ZipCode).replace(/[-_]/g, '')

      // const subAccount = {
      //   account: {
      //     Identity: values.cpf ? values.cpf : values.cnpj,
      //     BankData: {
      //       Bank: {
      //         Code: values.bank,
      //       },
      //       BankAgency: values.agency,
      //       BankAgencyDigit: values.digit,
      //       BankAccount: values.account,
      //       BankAccountDigit: values.digit,
      //       AccountType: {
      //         Code: values.accountType,
      //       },
      //     },
      //     Address: {
      //       ZipCode: ZipCode,
      //       Street: values.street,
      //       Number: values.number,
      //       Complement: values.complement,
      //       District: values.district,
      //       CityName: values.cityName,
      //       StateInitials: values.stateInitials,
      //       CountryName: values.countryName,
      //     },
      //   },
      // }

      // try {
      //   await api.post(`/users/${user.data.id}/safe2pay/sub-accounts`, subAccount, {
      //     headers: { 'sunize-access-token': user.data.access_token },
      //   })
      //   toast.success('Sua conta foi cadastrada!')
      // } catch (error) {
      //   toast.error('Ocorreu um erro ao tentar cadastrar sua conta!')
      // }
    },
    [user.data.id, user.data.access_token, isCpf],
  )

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
  }

  // const validate = useCallback(
  //   (values:any) => {
  //     const errors = {}

  //     if (values.bank === 'Nome do Banco' || !values.bank)
  //       errors.bank = 'Selecione o nome do Banco'

  //     if (isCpf) {
  //       const cpfLength = values.cpf.split('').length

  //       if (cpfLength < 14) {
  //         errors.cpf = 'CPF inválido'
  //       }
  //     } else {
  //       const cnpjLength = values.cnpj.split('').length
  //       if (cnpjLength < 18) {
  //         errors.cnpj = 'CNPJ inválido'
  //       }
  //     }

  //     return errors
  //   },
  //   [isCpf],
  // )

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
                ...addAcountDefaultValue
              }}
              onSubmit={onSubmit}
              // validate={validate}
              // validationSchema={schema}
              // validateOnChange
              // validateOnBlur
              render={({ errors, touched, setFieldValue }) => (
                <Form>
                  <SelectBank
                    defaultName="Nome do Banco"
                    options={bankTypes}
                    valueBeforeName
                    fieldName="bank"
                    setFieldValue={setFieldValue}
                  />

                  <FormGroupTop>
                    <FieldFormik
                      id="favoredName"
                      name="favoredName"
                      placeholder="Nome do Favorecido"
                      onChange={(e: any) => {
                        setFieldValue('favoredName', e.target.value)
                      }}
                    />
                  </FormGroupTop>

                  <FormGroupTop>
                    <PersonType>
                      <div>
                        <FieldFormik
                          onClick={() => {
                            setIsCpf(true)
                            setFieldValue('cnpj', '')
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
                            setIsCpf(false)
                            setFieldValue('cpf', '')
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
                        onChange={(e: any) => setFieldValue('cpf', e.target.value)}
                        placeholder="Digite seu CPF"
                        value={null}
                      />
                    ) : (
                      <InputCpfOrCnpj
                        id="cnpj"
                        name="cnpj"
                        mask="99.999.999/9999-99"
                        onChange={(e: any) => setFieldValue('cnpj', e.target.value)}
                        placeholder="Digite seu CNPJ"
                        value={null}
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
                      mask="999999"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('agency', event.target.value)}>
                    </InputMask>

                    <InputMask
                      name="account"
                      placeholder="Conta"
                      mask="99999999"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('account', event.target.value)}>
                    </InputMask>

                    <InputMask
                      name="digit"
                      placeholder="Digito"
                      mask="9"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('digit', event.target.value)}>
                    </InputMask>
                  </AccountFields>

                  <h2>Informações de endereço</h2>

                  <SingleSelect
                    id='countryName'
                    options={countriesFormated}
                    label="Selecione seu pais"
                    onChange={({ value }) => {
                      setFieldValue('countryName', String(value))
                    }}
                    placeholder="Selecione seu pais"
                    customTheme={{
                      primary25: 'rgba(236, 153, 58, 0.25)',
                      primary50: 'rgba(236, 153, 58, 0.5)',
                      primary: 'rgba(236, 153, 58, 1)',
                    }}
                  />

                  <InputMaskedModalAddAccount
                    name="zipCode"
                    text="Informe seu CEP"
                    mask="99999-999"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('zipCode', event.target.value)
                      getLocation(event.target.value, setFieldValue)
                    }}
                    placeholder="CEP"
                  />

                  {statusGetLocation === 'trying' ? (
                    <DotsLoader />
                  ) : statusGetLocation === 'nottried' ? (
                    ''
                  ) : (
                    <>
                      <Input
                        name="street"
                        text="Informe o nome da rua da sua residência"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('street', event.target.value)
                        }
                        placeholder="Rua da residência"
                      />

                      <InputMaskedModalAddAccount
                        name="number"
                        text="Informe o número da sua residência"
                        mask="999999"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue('number', event.target.value)
                        }
                        placeholder="Número da residência"
                      />

                      <Input
                        name="complement"
                        text="Complemento (Opcional)"
                        onChange={(e: any) =>
                          setFieldValue('complement', e.target.value)
                        }
                        placeholder="Digite um complemento para sua residência"
                      />

                      <Input
                        name="district"
                        text="Seu bairro *"
                        onChange={(e) =>
                          setFieldValue('district', e.target.value)
                        }
                        placeholder="Digite o nome do seu bairro"
                      />

                      <Input
                        name="cityName"
                        text="Nome de sua cidade *"
                        onChange={(e) =>
                          setFieldValue('cityName', e.target.value)
                        }
                        placeholder="Digite o nome de sua cidade"
                      />

                      {/* <InputMasked
                        name="StateInitials"
                        text="Sigla de seu estado *"
                        mask="aa"
                        maskChar=""
                        onChange={(e) =>
                          setFieldValue('StateInitials', e.target.value)
                        }
                        placeholder="Digite a sigla de seu estado"
                      /> */}
                      <Input
                        name="stateInitials"
                        text="Sigla de seu estado *"
                        onChange={(e: any) =>
                          setFieldValue('stateInitials', e.target.value)
                        }
                        placeholder="Digite a sigla de seu estado"
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
  )
}

