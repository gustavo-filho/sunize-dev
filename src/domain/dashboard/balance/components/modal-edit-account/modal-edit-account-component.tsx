import React, { useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useFormik, FormikProvider } from 'formik'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import axios, { AxiosResponse } from 'axios'
import { listBanks } from '../../listBanks'
import {
    FormGroup,
    Overlay,
} from '../modal-add-account/modal-add-account-styles'
import { useAppSelector } from '../../../../../store/hooks'
import { userSelector } from '@domain/auth/user/user.store'
import { api } from '@shared/services/api'
import { schemaAccount } from '../modal-add-account/modal-add-account-schema'
import { listCountries } from '../modal-add-account/list-coutries'
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component'
import { modalEditAccountComponentValue } from '../../types/modal-edit-account-component-types'
import { Autocomplete, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { addAcountTypeValues } from '../../types/modal-add-account-values-types'

export function ModalEditAccount({ modal, setModal, dataUpdateBanking }: modalEditAccountComponentValue): JSX.Element {
    const user = useAppSelector(userSelector);
    const [statusGetLocation, setStatusGetLocation] = useState('nottried')

    const editAcountDefaultValue: addAcountTypeValues = {
        bank: dataUpdateBanking.BankData.Bankname ? dataUpdateBanking.BankData.Bankname : '',
        favoredName: dataUpdateBanking.ResponsibleName ? dataUpdateBanking.ResponsibleName : '',
        personType: dataUpdateBanking.Identity.length === 11 ? 'PF' : 'PJ',
        cpf: dataUpdateBanking.Identity.length === 11 ? dataUpdateBanking.Identity : '',
        cnpj: dataUpdateBanking.Identity.length > 11 ? dataUpdateBanking.Identity : '',
        accountType: dataUpdateBanking.BankData.AccountType ? dataUpdateBanking.BankData.AccountType : '',
        agency: dataUpdateBanking.BankData.Agency ? dataUpdateBanking.BankData.Agency : '',
        account: dataUpdateBanking.BankData.Account ? dataUpdateBanking.BankData.Account : '',
        digit: dataUpdateBanking.BankData.AccountDigit ? dataUpdateBanking.BankData.AccountDigit : '',
        zipCode: dataUpdateBanking.Address.ZipCode ? dataUpdateBanking.Address.ZipCode : '',
        street: dataUpdateBanking.Address.Street ? dataUpdateBanking.Address.Street : '',
        number: dataUpdateBanking.Address.Number ? dataUpdateBanking.Address.Number : '',
        complement: dataUpdateBanking.Address.Complement ? dataUpdateBanking.Address.Complement : '',
        district: dataUpdateBanking.Address.District ? dataUpdateBanking.Address.District : '',
        cityName: dataUpdateBanking.Address.City ? dataUpdateBanking.Address.City : '',
        stateInitials: dataUpdateBanking.Address.State ? dataUpdateBanking.Address.State : '',
        countryName: dataUpdateBanking.Address.Country ? dataUpdateBanking.Address.Country : '',
    }

    function handleSubmit(values: addAcountTypeValues) {
        console.log('values', values)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...editAcountDefaultValue,
        },
        validationSchema: schemaAccount,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const getLocation = useCallback((value: string) => {
        const cep = value.replace(/[-_]/g, '')
        if (cep.length === 8) {
            setStatusGetLocation('trying')
            axios.get(`https:viacep.com.br/ws/${cep}/json/`).then((res: AxiosResponse<any, any>
            ) => {
                if (!res.data.erro) {
                    setStatusGetLocation('success')
                    formik.values.street = res.data.logradouro;
                    formik.values.complement = res.data.complemento;
                    formik.values.cityName = res.data.localidade;
                    formik.values.stateInitials = res.data.uf;
                    formik.values.countryName = 'Brasil';
                    formik.values.district = res.data.bairro;
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (formik.values.personType === 'PJ') {
            formik.values.cpf = ''
        }
        if (formik.values.personType === 'PF') {
            formik.values.cnpj = ''
        }
        if (formik.values.zipCode.length === 8) {
            getLocation(formik.values.zipCode)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values])



    return (
        <>
            {modal && (
                <Grid>
                    <FormikProvider value={formik}>
                        <form style={{
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
                        }} onSubmit={formik.handleSubmit}>

                            {/* <button>
                                <FaTimes onClick={() => setModal(!modal)} />
                            </button> */}

                            <Typography style={{
                                display: 'flex', justifyContent: 'center', marginTop: '3rem', marginBottom: '0.5rem',
                                fontWeight: 500, fontSize: '1.3rem', color: 'rgb(75, 75, 75)'
                            }}>
                                Editar Conta
                            </Typography>

                            <Typography style={{
                                marginTop: '10px', marginBottom: '10px', fontWeight: 500,
                                fontSize: '1.2rem', color: 'rgb(75, 75, 75)'
                            }}>
                                Informações Pessoais
                            </Typography>

                            <Typography>Nome do Favorecido</Typography>
                            <TextField
                                id='favoredName'
                                name="favoredName"
                                placeholder="Digite o nome do favorecido"
                                variant='outlined'
                                value={formik.values.favoredName}
                                onChange={formik.handleChange}
                                error={formik.touched.favoredName && Boolean(formik.errors.favoredName)}
                                helperText={formik.touched.favoredName && formik.errors.favoredName}
                            />

                            <FormControl>
                                <Typography style={{ marginTop: '20px', marginBottom: '30px' }}>Você é Pessoa?</Typography>
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
                                        label={<Typography>Jurídica </Typography>} />

                                    <FormControlLabel
                                        value="PF"
                                        control={<Radio style={{ color: '#818181' }} />}
                                        label={<Typography>Física</Typography>} />
                                </RadioGroup>
                            </FormControl>

                            {formik.values.personType === 'PF' ? (
                                <TextField
                                    id="cpf"
                                    name="cpf"
                                    onChange={formik.handleChange}
                                    value={formik.values.cpf}
                                    placeholder="Digite seu CPF"
                                />
                            ) : (
                                <TextField
                                    id="cnpj"
                                    name="cnpj"
                                    onChange={formik.handleChange}
                                    value={formik.values.cnpj}
                                    placeholder="Digite seu CNPJ"
                                />
                            )}

                            <Typography style={{
                                marginTop: '30px', fontWeight: 500,
                                fontSize: '1.2rem', color: 'rgb(75, 75, 75)'
                            }}>
                                Informações Bancárias
                            </Typography>

                            <Typography style={{ marginTop: '10px', }}>
                                Selecione o banco da sua conta:
                            </Typography>

                            <Autocomplete
                                id="bank"
                                options={listBanks}
                                getOptionLabel={(option) => option.name}
                                onChange={(_event, item) => {
                                    if (item && item.value) {
                                        formik.values.bank = String(item.value)
                                    }
                                }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        id='bankName'
                                        placeholder="Selecione o banco"
                                        variant="outlined"
                                    />}
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
                                    <FormControlLabel value="Conta Corrente"
                                        control={<Radio style={{ color: '#818181' }} />}
                                        label={<Typography>Corrente </Typography>} />

                                    <FormControlLabel value="Conta Poupança"
                                        control={<Radio style={{ color: '#818181' }} />}
                                        label={<Typography>Poupança</Typography>} />
                                </RadioGroup>
                            </FormControl>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '-20px' }}>
                                <Typography>
                                    Agencia
                                </Typography>
                                <Typography>
                                    Conta
                                </Typography>
                                <Typography>
                                    Digito
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                <TextField
                                    style={{ width: '30%' }}
                                    id='agency'
                                    name="agency"
                                    placeholder="Agência"
                                    variant='outlined'
                                    value={formik.values.agency}
                                    onChange={formik.handleChange}
                                    error={formik.touched.agency && Boolean(formik.errors.agency)}
                                    helperText={formik.touched.agency && formik.errors.agency}
                                />
                                <TextField
                                    style={{ width: '30%' }}
                                    id='account'
                                    name="account"
                                    placeholder="Conta"
                                    variant='outlined'
                                    value={formik.values.account}
                                    onChange={formik.handleChange}
                                    error={formik.touched.account && Boolean(formik.errors.account)}
                                    helperText={formik.touched.account && formik.errors.account}
                                />
                                <TextField
                                    style={{ width: '30%' }}
                                    id='digit'
                                    name="digit"
                                    placeholder="Digito"
                                    variant='outlined'
                                    value={formik.values.digit}
                                    onChange={formik.handleChange}
                                    error={formik.touched.digit && Boolean(formik.errors.digit)}
                                    helperText={formik.touched.digit && formik.errors.digit}
                                />
                            </div>

                            <Typography style={{
                                marginTop: '30px', fontWeight: 500,
                                fontSize: '1.2rem', color: 'rgb(75, 75, 75)'
                            }}>
                                Informações de Endereço
                            </Typography>

                            <Autocomplete
                                id="selectCountry"
                                options={listCountries}
                                getOptionLabel={(option) => option.nome}
                                onChange={(_event, item) => {
                                    if (item && item.nome) {
                                        formik.values.countryName = item.nome
                                    }
                                }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        placeholder="Selecione o país"
                                        variant="outlined"
                                    />}
                            />

                            <Typography style={{ marginTop: '20px' }}>CEP</Typography>
                            <TextField
                                id='zipCode'
                                name="zipCode"
                                placeholder="Digite o CEP:"
                                variant='outlined'
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
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
                                    <TextField
                                        id='street'
                                        name="street"
                                        placeholder="Digite o nome da rua:"
                                        variant='outlined'
                                        value={formik.values.street}
                                        onChange={formik.handleChange}
                                        error={formik.touched.street && Boolean(formik.errors.street)}
                                        helperText={formik.touched.street && formik.errors.street}
                                    />

                                    <Typography style={{ marginTop: '20px' }}>Número</Typography>
                                    <TextField
                                        id='number'
                                        name="number"
                                        placeholder="Digite o número:"
                                        variant='outlined'
                                        value={formik.values.number}
                                        onChange={formik.handleChange}
                                        error={formik.touched.number && Boolean(formik.errors.number)}
                                        helperText={formik.touched.number && formik.errors.number}
                                    />

                                    <Typography style={{ marginTop: '20px' }}>Complemento</Typography>
                                    <TextField
                                        id='complement'
                                        name="complement"
                                        placeholder="Digite o complemento(opcional):"
                                        variant='outlined'
                                        value={formik.values.complement}
                                        onChange={formik.handleChange}
                                        error={formik.touched.complement && Boolean(formik.errors.complement)}
                                        helperText={formik.touched.complement && formik.errors.complement}
                                    />

                                    <Typography style={{ marginTop: '20px' }}>Bairro</Typography>
                                    <TextField
                                        id='district'
                                        name="district"
                                        placeholder="Digite o nome do bairro:"
                                        variant='outlined'
                                        value={formik.values.district}
                                        onChange={formik.handleChange}
                                        error={formik.touched.district && Boolean(formik.errors.district)}
                                        helperText={formik.touched.district && formik.errors.district}
                                    />

                                    <Typography style={{ marginTop: '20px' }}>Cidade</Typography>
                                    <TextField
                                        id='cityName'
                                        name="cityName"
                                        placeholder="Digite a cidade:"
                                        variant='outlined'
                                        value={formik.values.cityName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cityName && Boolean(formik.errors.cityName)}
                                        helperText={formik.touched.cityName && formik.errors.cityName}
                                    />

                                    <Typography style={{ marginTop: '20px' }}>Sigla do Estado</Typography>
                                    <TextField
                                        id='stateInitials'
                                        name="stateInitials"
                                        placeholder="Digite a UF do Estado:"
                                        variant='outlined'
                                        value={formik.values.stateInitials}
                                        onChange={formik.handleChange}
                                        error={formik.touched.stateInitials && Boolean(formik.errors.stateInitials)}
                                        helperText={formik.touched.stateInitials && formik.errors.stateInitials}
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
    )
}

