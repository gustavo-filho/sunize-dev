import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import axios from 'axios';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { listBanks } from '../../config/list-banks';
import { listCountries } from '../../config/list-coutries';
import { IAccountComponentModalPropsValues } from '../../types/account-component-modal-props-values';
import { IAccountComponentModalTypes } from '../../types/account-component-modal-types';
import { ISubAccountTypesValues } from '../../types/account-component-sub-account-types';
import { TextFieldComponent } from '../textFieldComponent';
import { schemaAccount } from './account-schema';
import { FormGroup, Overlay } from './account-styled-component-styles';

export function AccountComponentModal({
  modal,
  setModal,
  updateModal,
  dataUpdateBanking,
}: IAccountComponentModalPropsValues): JSX.Element {
  const { user } = useUser();

  const [statusGetLocation, setStatusGetLocation] = useState('nottried');
  const [dataResponse, setDataResponse] =
    useState<IAccountComponentModalTypes>();

  useEffect(() => {
    if (updateModal && dataUpdateBanking) {
      const editAcountDefaultValue: IAccountComponentModalTypes = {
        bank: dataUpdateBanking.BankData.Bankname,
        favoredName: dataUpdateBanking.ResponsibleName,
        personType: dataUpdateBanking.Identity.length === 11 ? 'PF' : 'PJ',
        cpf:
          dataUpdateBanking.Identity.length === 11
            ? dataUpdateBanking.Identity
            : '',
        cnpj:
          dataUpdateBanking.Identity.length > 11
            ? dataUpdateBanking.Identity
            : '',
        accountType: dataUpdateBanking.BankData.AccountType,
        agency: dataUpdateBanking.BankData.Agency,
        account: dataUpdateBanking.BankData.Account,
        digit: dataUpdateBanking.BankData.AccountDigit,
        zipCode: dataUpdateBanking.Address.ZipCode,
        street: dataUpdateBanking.Address.Street,
        number: dataUpdateBanking.Address.Number,
        complement: dataUpdateBanking.Address.Complement,
        district: dataUpdateBanking.Address.District,
        cityName: dataUpdateBanking.Address.City,
        stateInitials: dataUpdateBanking.Address.State,
        countryName: dataUpdateBanking.Address.Country,
      };
      setDataResponse(editAcountDefaultValue);
    } else {
      const addAcountDefaultValue: IAccountComponentModalTypes = {
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
      setDataResponse(addAcountDefaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(
    values: IAccountComponentModalTypes,
  ): Promise<void> {
    console.log('fui chamado', values);
    const subAccount: ISubAccountTypesValues = {
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
          ZipCode: values.zipCode,
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
      await api.post(`/users/${user!.id}/safe2pay/sub-accounts`, subAccount, {
        headers: { 'sunize-access-token': user!.access_token },
      });
      toast.success('Sua conta foi cadastrada!');
      setModal(false);
    } catch (error) {
      toast.error(
        'Ocorreu um erro ao tentar cadastrar sua conta, favor entrar em contato com o suporte!',
      );
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...dataResponse,
    },
    validationSchema: schemaAccount,
    onSubmit: values => {
      if (!updateModal) {
        handleSubmit(values);
      } else {
        console.log(
          'Faltar implementar o back-end com o serviço de atualizar conta!',
        );
      }
    },
  });

  async function getLocation(cep: string): Promise<void> {
    setStatusGetLocation('trying');
    try {
      const response = await axios.get(`https:viacep.com.br/ws/${cep}/json/`);
      setStatusGetLocation('success');
      formik.values.street = response.data.logradouro;
      formik.values.complement = response.data.complemento;
      formik.values.cityName = response.data.localidade;
      formik.values.stateInitials = response.data.uf;
      formik.values.countryName = 'Brasil';
      formik.values.district = response.data.bairro;
    } catch (error) {
      toast.error(
        'Error na consulta do cep, favor inserir o endereço manualmente.',
      );
    }
  }

  useEffect(() => {
    if (formik.values.personType === 'PJ') {
      formik.values.cpf = '';
    }
    if (formik.values.personType === 'PF') {
      formik.values.cnpj = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  useEffect(() => {
    if (formik.values.zipCode && formik.values.zipCode.length === 8) {
      getLocation(formik.values.zipCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.zipCode]);

  return (
    <>
      {modal && (
        <Grid>
          <FormikProvider value={formik}>
            <form
              style={{
                position: 'fixed',
                zIndex: 4,
                top: '50%',
                height: '80%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                borderRadius: '20px',
                width: '98%',
                maxWidth: '500px',
                minHeight: '450px',
                overflowY: 'auto',
                padding: '0 56px',
                display: 'flex',
                flexDirection: 'column',
              }}
              onSubmit={formik.handleSubmit}
            >
              {/* <button>
                                <FaTimes onClick={() => setModal(!modal)} />
                            </button> */}

              {!updateModal ? (
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    fontSize: '1.3rem',
                    color: 'rgb(75, 75, 75)',
                  }}
                >
                  Cadastrar Conta
                </Typography>
              ) : (
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    fontSize: '1.3rem',
                    color: 'rgb(75, 75, 75)',
                  }}
                >
                  Editar Conta
                </Typography>
              )}

              <Typography
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  color: 'rgb(75, 75, 75)',
                }}
              >
                Informações Pessoais
              </Typography>

              <Typography>Nome do Favorecido</Typography>
              <TextFieldComponent
                id="favoredName"
                name="favoredName"
                placeholder="Digite o nome do favorecido"
                variant="outlined"
                value={formik.values.favoredName}
                onChange={formik.handleChange}
                error={
                  formik.touched.favoredName &&
                  Boolean(formik.errors.favoredName)
                }
                helperText={
                  formik.touched.favoredName && formik.errors.favoredName
                }
              />

              <FormControl>
                <Typography style={{ marginTop: '20px', marginBottom: '30px' }}>
                  Você é Pessoa?
                </Typography>
                <RadioGroup
                  style={{ marginTop: '-30px' }}
                  row
                  name="personType"
                  defaultValue="PF"
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="PJ"
                    control={<Radio style={{ color: '#818181' }} />}
                    label={<Typography>Jurídica </Typography>}
                  />

                  <FormControlLabel
                    value="PF"
                    control={<Radio style={{ color: '#818181' }} />}
                    label={<Typography>Física</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              {formik.values.personType === 'PF' ? (
                <>
                  <Typography>CPF</Typography>
                  <TextFieldComponent
                    id="cpf"
                    name="cpf"
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    placeholder="Digite seu CPF"
                    error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                    helperText={formik.touched.cpf && formik.errors.cpf}
                  />
                </>
              ) : (
                <>
                  <Typography>CNPJ</Typography>
                  <TextFieldComponent
                    id="cnpj"
                    name="cnpj"
                    onChange={formik.handleChange}
                    value={formik.values.cnpj}
                    placeholder="Digite seu CNPJ"
                    error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                    helperText={formik.touched.cnpj && formik.errors.cnpj}
                  />
                </>
              )}

              <Typography
                style={{
                  marginTop: '30px',
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  color: 'rgb(75, 75, 75)',
                }}
              >
                Informações Bancárias
              </Typography>

              <Typography style={{ marginTop: '10px' }}>
                Selecione o banco da sua conta:
              </Typography>

              <Autocomplete
                id="bank"
                options={listBanks}
                getOptionLabel={option => option.name}
                onChange={(_event, item) => {
                  if (item && item.value) {
                    formik.values.bank = String(item.value);
                  }
                }}
                renderInput={params => (
                  <TextFieldComponent
                    {...params}
                    id="bank"
                    placeholder="Selecione o banco"
                    variant="outlined"
                  />
                )}
              />

              <FormControl>
                <Typography style={{ marginTop: '20px', marginBottom: '30px' }}>
                  Qual o tipo da sua conta?
                </Typography>
                <RadioGroup
                  style={{ marginTop: '-30px' }}
                  row
                  name="accountType"
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Conta Corrente"
                    control={<Radio style={{ color: '#818181' }} />}
                    label={<Typography>Corrente </Typography>}
                  />

                  <FormControlLabel
                    value="Conta Poupança"
                    control={<Radio style={{ color: '#818181' }} />}
                    label={<Typography>Poupança</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                  marginBottom: '-20px',
                }}
              >
                <Typography>Agencia</Typography>
                <Typography>Conta</Typography>
                <Typography>Digito</Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                }}
              >
                <TextFieldComponent
                  style={{ width: '30%' }}
                  id="agency"
                  name="agency"
                  placeholder="Agência"
                  variant="outlined"
                  value={formik.values.agency}
                  onChange={formik.handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(0, Number(e.target.value))
                      .toString()
                      .slice(0, 5);
                  }}
                  error={formik.touched.agency && Boolean(formik.errors.agency)}
                  helperText={formik.touched.agency && formik.errors.agency}
                />
                <TextFieldComponent
                  style={{ width: '30%' }}
                  id="account"
                  name="account"
                  type="number"
                  placeholder="Conta"
                  variant="outlined"
                  value={formik.values.account}
                  onChange={formik.handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(0, Number(e.target.value))
                      .toString()
                      .slice(0, 8);
                  }}
                  error={
                    formik.touched.account && Boolean(formik.errors.account)
                  }
                  helperText={formik.touched.account && formik.errors.account}
                />
                <TextFieldComponent
                  style={{ width: '30%' }}
                  id="digit"
                  name="digit"
                  type="number"
                  placeholder="Digito"
                  variant="outlined"
                  value={formik.values.digit}
                  onChange={formik.handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(0, Number(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                  error={formik.touched.digit && Boolean(formik.errors.digit)}
                  helperText={formik.touched.digit && formik.errors.digit}
                />
              </div>

              <Typography
                style={{
                  marginTop: '30px',
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  color: 'rgb(75, 75, 75)',
                }}
              >
                Informações de Endereço
              </Typography>

              <Typography>País</Typography>
              <Autocomplete
                id="countryName"
                options={listCountries}
                getOptionLabel={option => option.nome}
                onChange={(_event, item) => {
                  if (item && item.nome) {
                    formik.values.countryName = item.nome;
                  }
                }}
                renderInput={params => (
                  <TextFieldComponent
                    {...params}
                    placeholder="Selecione o país"
                    variant="outlined"
                    onChange={formik.handleChange}
                  />
                )}
              />

              <Typography style={{ marginTop: '20px' }}>CEP</Typography>
              <TextFieldComponent
                id="zipCode"
                name="zipCode"
                placeholder="Digite o CEP:"
                variant="outlined"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = Math.max(0, Number(e.target.value))
                    .toString()
                    .slice(0, 8);
                }}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />

              {statusGetLocation === 'trying' ? (
                <DotsLoader />
              ) : statusGetLocation === 'nottried' ? (
                ''
              ) : (
                <>
                  <Typography style={{ marginTop: '20px' }}>Rua</Typography>
                  <TextFieldComponent
                    id="street"
                    name="street"
                    placeholder="Digite o nome da rua:"
                    variant="outlined"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
                    helperText={formik.touched.street && formik.errors.street}
                  />

                  <Typography style={{ marginTop: '20px' }}>Número</Typography>
                  <TextFieldComponent
                    id="number"
                    name="number"
                    placeholder="Digite o número:"
                    variant="outlined"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.number && Boolean(formik.errors.number)
                    }
                    helperText={formik.touched.number && formik.errors.number}
                  />

                  <Typography style={{ marginTop: '20px' }}>
                    Complemento
                  </Typography>
                  <TextFieldComponent
                    id="complement"
                    name="complement"
                    placeholder="Digite o complemento(opcional):"
                    variant="outlined"
                    value={formik.values.complement}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.complement &&
                      Boolean(formik.errors.complement)
                    }
                    helperText={
                      formik.touched.complement && formik.errors.complement
                    }
                  />

                  <Typography style={{ marginTop: '20px' }}>Bairro</Typography>
                  <TextFieldComponent
                    id="district"
                    name="district"
                    placeholder="Digite o nome do bairro:"
                    variant="outlined"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.district && Boolean(formik.errors.district)
                    }
                    helperText={
                      formik.touched.district && formik.errors.district
                    }
                  />

                  <Typography style={{ marginTop: '20px' }}>Cidade</Typography>
                  <TextFieldComponent
                    id="cityName"
                    name="cityName"
                    placeholder="Digite a cidade:"
                    variant="outlined"
                    value={formik.values.cityName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.cityName && Boolean(formik.errors.cityName)
                    }
                    helperText={
                      formik.touched.cityName && formik.errors.cityName
                    }
                  />

                  <Typography style={{ marginTop: '20px' }}>
                    Sigla do Estado
                  </Typography>
                  <TextFieldComponent
                    id="stateInitials"
                    name="stateInitials"
                    placeholder="Digite a UF do Estado:"
                    variant="outlined"
                    value={formik.values.stateInitials}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.stateInitials &&
                      Boolean(formik.errors.stateInitials)
                    }
                    helperText={
                      formik.touched.stateInitials &&
                      formik.errors.stateInitials
                    }
                  />
                </>
              )}
              <FormGroup>
                <button type="submit">Cadastrar Conta</button>
              </FormGroup>
            </form>
          </FormikProvider>
          <Overlay onClick={() => setModal(!modal)}></Overlay>
        </Grid>
      )}
    </>
  );
}
