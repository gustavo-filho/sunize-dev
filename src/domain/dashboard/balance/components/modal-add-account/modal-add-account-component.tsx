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
import InputMasked from '@shared/components/input-masked/input-masked.component'
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
          setFieldValue('Street', res.data.logradouro)
          setFieldValue('Complement', res.data.complemento)
          setFieldValue('CityName', res.data.localidade)
          setFieldValue('StateInitials', res.data.uf)
          setFieldValue('CountryName', 'Brasil')
          setFieldValue('District', res.data.bairro)
        }
      })
    }
  }, [])

  const onSubmit = useCallback(
    async (values: any) => {
      if (isCpf === true) {
        values.cpnj = ''
      } else {
        values.cpf = ''
      }

      let ZipCode = values.ZipCode
      ZipCode = String(ZipCode).replace(/[-_]/g, '')

      const subAccount = {
        account: {
          Identity: values.cpf ? values.cpf : values.cnpj,
          BankData: {
            Bank: {
              Code: values.bank,
            },
            BankAgency: values.agency,
            BankAgencyDigit: values.BankAgencyDigit,
            BankAccount: values.account,
            BankAccountDigit: values.digit,
            AccountType: {
              Code: values.account_type,
            },
          },
          Address: {
            ZipCode: ZipCode,
            Street: values.Street,
            Number: values.Number,
            Complement: values.Complement,
            District: values.District,
            CityName: values.CityName,
            StateInitials: values.StateInitials,
            CountryName: values.CountryName,
          },
        },
      }

      try {
        await api.post(`/users/${user.data.id}/safe2pay/sub-accounts`, subAccount, {
          headers: { 'sunize-access-token': user.data.access_token },
        })
        toast.success('Sua conta foi cadastrada!')
      } catch (error) {
        toast.error('Ocorreu um erro ao tentar cadastrar sua conta!')
      }
    },
    [user.data.id, user.data.access_token, isCpf],
  )

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
                bank: '',
                favoredName: '',
                person_type: 'PF',
                cpf: '',
                cnpj: '',
                account_type: '',
                agency: '',
                account: '',
                digit: '',
                ZipCode: '',
                Street: '',
                Number: '',
                Complement: '',
                District: '',
                CityName: '',
                StateInitials: '',
                CountryName: '',
              }}
              onSubmit={onSubmit}
              // validate={validate}
              validationSchema={schema}
              validateOnChange
              validateOnBlur
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
                      name="favoredName"
                      placeholder="Nome do Favorecido"
                    />
                    {/* <InputMask
                      mask={null}
                      maskChar=""
                      onChange={(e: any) => {
                        const value = parseFloat(e.target.value) ?? ''
                        setFieldValue('agency', value)
                      }}
                    >
                      {(inputProps:any) => (
                        <FieldFormik
                          {...inputProps}
                          name="favoredName"
                          placeholder="Nome do Favorecido"
                        />
                      )}
                    </InputMask> */}
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
                          name="person_type"
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
                          name="person_type"
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
                        name="account_type"
                        value="CURRENT_ACCOUNT"
                      />
                      <label htmlFor="current">Conta Corrente</label>
                    </InputRadio>

                    <InputRadio>
                      <FieldFormik
                        type="radio"
                        id="savings"
                        name="account_type"
                        value="SAVINGS_ACCOUNT"
                      />
                      <label htmlFor="SAVINGS_ACCOUNT">Conta Poupança</label>
                    </InputRadio>
                  </FormGroup>

                  <AccountFields>
                    {/* <InputMask
                      mask="999999"
                      maskChar=""
                      onChange={(e) => setFieldValue('agency', e.target.value)}
                    >
                      {(inputProps) => (
                        <FieldFormik
                          {...inputProps}
                          name="agency"
                          placeholder="Agência"
                        />
                      )}
                    </InputMask> */}

                    <FieldFormik
                      name="agency"
                      placeholder="Agência"
                    />

                    <FieldFormik
                      name="account"
                      placeholder="Conta"
                    />

                    {/* <InputMask
                      mask="99999999"
                      maskChar=""
                      onChange={(e) => setFieldValue('account', e.target.value)}
                    >
                      {(inputProps: any) => (
                        <FieldFormik
                          {...inputProps}
                          name="account"
                          placeholder="Conta"
                        />
                      )}
                    </InputMask> */}

                    {/* <InputMask
                      mask="9"
                      maskChar=""
                      onChange={(e) => setFieldValue('digit', e.target.value)}
                    >
                      {(inputProps: any) => (
                        <FieldFormik
                          {...inputProps}
                          name="digit"
                          placeholder="Digito"
                        />
                      )}
                    </InputMask> */}
                    <FieldFormik
                      name="digit"
                      placeholder="Digito"
                    />
                  </AccountFields>

                  <h2>Informações de endereço</h2>

                  <SingleSelect
                    options={countriesFormated}
                    label="Selecione seu pais"
                    onChange={({ value }) => {
                      setFieldValue('CountryName', String(value))
                    }}
                    placeholder="Selecione seu pais"
                    customTheme={{
                      primary25: 'rgba(236, 153, 58, 0.25)',
                      primary50: 'rgba(236, 153, 58, 0.5)',
                      primary: 'rgba(236, 153, 58, 1)',
                    }}
                  />

                  {/* <InputMasked
                    name="ZipCode"
                    text="Seu CEP *"
                    mask="99999-999"
                    maskChar=""
                    onChange={(e: any) => {
                      setFieldValue('ZipCode', e.target.value)
                      getLocation(e.target.value, setFieldValue)
                    }}
                    placeholder="Digite seu CEP"
                  /> */}

                  <Input
                    name="ZipCode"
                    text="Seu CEP *"
                    onChange={(e: any) => {
                      setFieldValue('ZipCode', e.target.value)
                      getLocation(e.target.value, setFieldValue)
                    }}
                    placeholder="Digite seu CEP"
                  />

                  {statusGetLocation === 'trying' ? (
                    <DotsLoader />
                  ) : statusGetLocation === 'nottried' ? (
                    ''
                  ) : (
                    <>
                      <Input
                        name="Street"
                        text="Sua rua *"
                        onChange={(e: any) =>
                          setFieldValue('Street', e.target.value)
                        }
                        placeholder="Digite o nome da sua rua"
                      />

                      {/* <InputMasked
                        name="Number"
                        text="Número de sua residência *"
                        mask="999"
                        maskChar=""
                        onChange={(e) =>
                          setFieldValue('Number', e.target.value)
                        }
                        placeholder="Digite o número de sua residência"
                      /> */}

                      <Input
                        name="Number"
                        text="Número de sua residência *"
                        onChange={(e: any) =>
                          setFieldValue('Number', e.target.value)
                        }
                        placeholder="Digite o número de sua residência"
                      />

                      <Input
                        name="Complement"
                        text="Complemento (Opcional)"
                        onChange={(e: any) =>
                          setFieldValue('Complement', e.target.value)
                        }
                        placeholder="Digite um complemento para sua residência"
                      />

                      <Input
                        name="District"
                        text="Seu bairro *"
                        onChange={(e) =>
                          setFieldValue('District', e.target.value)
                        }
                        placeholder="Digite o nome do seu bairro"
                      />

                      <Input
                        name="CityName"
                        text="Nome de sua cidade *"
                        onChange={(e) =>
                          setFieldValue('CityName', e.target.value)
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
                        name="StateInitials"
                        text="Sigla de seu estado *"
                        onChange={(e: any) =>
                          setFieldValue('StateInitials', e.target.value)
                        }
                        placeholder="Digite a sigla de seu estado"
                      />
                    </>
                  )}

                  <Error>
                    <ErrorMessage name="CountryName" />
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

                    {errors.account_type && touched.account_type && (
                      <p>
                        <FaTimesCircle />
                        &nbsp;&nbsp;
                        {errors.account_type}
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
          {/* <Overlay modal={modal} onClick={() => setModal(!modal)}></Overlay> */}
        </Container>
      )}
    </>
  )
}

