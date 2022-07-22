import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Container, useStyles } from './styles'
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component'
import { api } from '@shared/services/api'
import { useAppSelector } from '../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { wrapperNavigation } from '../components/wrapper-navigation.component'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Typography } from 'antd';
import { toast } from 'react-toastify';

interface dataResponseInitType {
    Amount: number
    DepositDate: string
    HashConfirmation: null
    IsTransferred: boolean
    Message: string
    PaymentNumber: string
    Tax: number
}

export function AccountStatements(): JSX.Element {
    const classes = useStyles();
    const user = useAppSelector(userSelector);
    const [modalFilter, setModalFilter] = useState(false);
    const [monthFilter, setMonthFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [init, setInit] = useState(true)
    const [dataResponseInit, setDataResponseInit] = useState<dataResponseInitType[]>([]);
    const [responseLastSixMonths, setResponseLastSixMonths] = useState<number[]>([])
    const tableHeader = [
        { titleHeader: 'Data' },
        { titleHeader: 'Valor' },
        { titleHeader: 'Message' },
        { titleHeader: 'Taxa' },
    ]

    function lastSixMonths(): void {
        const data = new Date();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        let lastSixMonths = []
        let sixMonth = 6
        let monthValue = Number(mes)
        while (sixMonth !== 0) {
            sixMonth = sixMonth - 1
            monthValue = monthValue - 1
            lastSixMonths.push(monthValue)
        }
        setResponseLastSixMonths(lastSixMonths);
    }

    useEffect(() => {
        lastSixMonths()
    }, [])

    async function functionListDeposits(): Promise<void> {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1
        const currentYear = currentDate.getFullYear();
        const month1 = responseLastSixMonths[0]
        const month2 = responseLastSixMonths[1]
        const month3 = responseLastSixMonths[2]
        const month4 = responseLastSixMonths[3]
        const month5 = responseLastSixMonths[4]
        const month6 = responseLastSixMonths[5]

        const response7 = await api.get(`/users/${user.data.id}/listDeposits?month=${currentMonth}&year=${currentYear}`)
        const response6 = await api.get(`/users/${user.data.id}/listDeposits?month=${month6}&year=${currentYear}`)
        const response5 = await api.get(`/users/${user.data.id}/listDeposits?month=${month5}&year=${currentYear}`)
        const response4 = await api.get(`/users/${user.data.id}/listDeposits?month=${month4}&year=${currentYear}`)
        const response3 = await api.get(`/users/${user.data.id}/listDeposits?month=${month3}&year=${currentYear}`)
        const response2 = await api.get(`/users/${user.data.id}/listDeposits?month=${month2}&year=${currentYear}`)
        const response1 = await api.get(`/users/${user.data.id}/listDeposits?month=${month1}&year=${currentYear}`)

        const listFilter7 = response7.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })
        const listFilter6 = response6.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })
        const listFilter5 = response5.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })
        const listFilter4 = response4.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })
        const listFilter3 = response3.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })
        const listFilter2 = response2.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })
        const listFilter1 = response1.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
            if (itemFilter.Message === 'Pagamento Efetivado') {
                return itemFilter
            }
            return ''
        })


        setDataResponseInit([
            ...listFilter1,
            ...listFilter2,
            ...listFilter3,
            ...listFilter4,
            ...listFilter5,
            ...listFilter6,
            ...listFilter7,
        ])
        setInit(false)
    }

    useEffect(() => {
        functionListDeposits()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseLastSixMonths])

    async function filterModal(): Promise<void> {
        try {
            const response = await api.get(`/users/${user.data.id}/listDeposits?month=${monthFilter}&year=${yearFilter}`)
            setDataResponseInit([])
            if (response) {
                setDataResponseInit(response.data.body.Deposits.filter((itemFilter: dataResponseInitType) => {
                    if (itemFilter.Message !== 'Pagamento Efetivado') {
                        return itemFilter
                    }
                    return ''
                }))
                setModalFilter(false);
            }
        } catch (error) {
            toast.error('Não foi possivel realizar a filtragem, favor verificar!')
        }
    }

    function clearFilter(): void {
        setDataResponseInit([])
        functionListDeposits()
    }

    return (
        <Container>
            <h2>Extratos</h2>
            <p>
                Informações sobre seu saldo disponível e extratos dos saques
                realizados.
            </p>
            <div className="wrapperNavigation">
                {wrapperNavigation()}
            </div>

            <div style={{ backgroundColor: '#27293d', borderRadius: '0 6px 6px 6px' }}>
                <h3>Extratos e Relatórios</h3>
                <Button onClick={() => setModalFilter(true)}
                    sx={{ backgroundColor: '#bcbcc2', color: 'black', height: '20px', marginRight: '20px' }}>
                    <FilterAltIcon />
                </Button>
                <Button
                    onClick={() => clearFilter()}
                    sx={{ backgroundColor: '#bcbcc2', color: 'black', height: '20px' }}>
                    <FilterAltOffIcon />
                </Button>
                <Divider sx={{ backgroundColor: '#61616e', marginTop: '15px' }} />
                <TableContainer component={Paper}>
                    <Table sx={{ backgroundColor: '#27293d', minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className={classes.tableRow}>
                                {tableHeader.map((itemMap) => {
                                    return (
                                        <TableCell key={uuid()} sx={{ fontWeight: 600, color: '#bcbcc2' }} align="left">{itemMap.titleHeader}</TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>

                        {dataResponseInit.length > 0 && (
                            <>
                                {dataResponseInit.map((row) => {
                                    if (row.Message) {
                                        return (
                                            <TableBody>
                                                <TableRow className={classes.tableRow}
                                                    key={uuid()}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell key={uuid()} sx={{ color: '#bcbcc2' }} component="th" scope="row">
                                                        {row.DepositDate.split('-').reverse().join('/')}
                                                    </TableCell>
                                                    <TableCell key={uuid()} sx={{ color: '#bcbcc2' }} component="th" scope="row">
                                                        {row.Amount}
                                                    </TableCell>
                                                    <TableCell key={uuid()} sx={{ color: '#bcbcc2' }} component="th" scope="row">
                                                        {row.Message}
                                                    </TableCell>
                                                    <TableCell key={uuid()} sx={{ color: '#bcbcc2' }} align="left">
                                                        {row.Tax}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )
                                    }
                                    return <></>
                                })}
                            </>
                        )}
                    </Table>
                </TableContainer>
                {init && (
                    <Typography style={{ display: 'inline-block', width: '100%', textAlign: 'center', margin: '16px', marginTop: '32px', color: ' #bcbcc2' }}> Carregando os dados, favor aguarde...</Typography>
                )}
                {dataResponseInit.length === 0 && !init && (
                    <Typography style={{ display: 'inline-block', width: '100%', textAlign: 'center', margin: '16px', marginTop: '32px', color: ' #bcbcc2' }}>Nenhum resultado a ser exibido!</Typography>
                )}
            </div>

            <Dialog
                open={modalFilter}
                onClose={() => setModalFilter(false)}>
                <DialogTitle>Filtro</DialogTitle>

                <DialogContent sx={{ width: '300px', height: '120px' }}>

                    <div style={{ float: 'left', marginRight: '20px' }}>
                        <Typography style={{ fontSize: '15px', marginBottom: '10px' }}>Mês</Typography>
                        <TextField InputProps={{ inputProps: { min: 1, max: 12 } }} onChange={(event) => setMonthFilter(event.target.value)} sx={{ width: '80px' }} type='number' variant='outlined' />
                    </div>
                    <div>
                        <Typography style={{ fontSize: '15px', marginBottom: '10px' }}>Ano</Typography>
                        <TextField onChange={(event) => setYearFilter(event.target.value)} sx={{ width: '100px' }} type='text' variant='outlined' />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setModalFilter(false)}>Cancelar</Button>
                    <Button onClick={() => filterModal()}>Filtrar</Button>
                </DialogActions>
            </Dialog>

            <CopyrightFooter />
        </Container >
    )
}