import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component'
import { api } from '@shared/services/api'
import { useAppSelector } from '../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { wrapperNavigation } from '../components/wrapper-navigation.component'
import { transactionDataType } from '../types/account-statements-transaction-data-types'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Typography } from 'antd';

export function AccountStatements(): JSX.Element {
    const listAccountsTemp: transactionDataType[] = [
        {
            transactionId: 45615181,
            date: "01/07/2022",
            value: "R$ 1000,00",
            account: "123456-1",
            bank: "Inter",
            userName: "Thiego"
        },
        {
            transactionId: 45615182,
            date: "02/07/2022",
            value: "R$ 1500,00",
            account: "654321-1",
            bank: "Inter",
            userName: "Guilherme"
        },
        {
            transactionId: 45615183,
            date: "03/07/2022",
            value: "R$ 2500,00",
            account: "123789-1",
            bank: "Inter",
            userName: "Belluci"
        }
    ]
    const user = useAppSelector(userSelector);
    const [modalFilter, setModalFilter] = useState(false);
    const [dtIni, setDtIni] = useState('');
    const [dataResponse, setDataResponse] = useState();


    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const response = await api.get(`/users/${user.data.id}/listDeposits?month=07&year=2022`)

            } catch (error) {
                console.log('error', error)
            }
        }

        fetchMyAPI()
    }, [user.data.id])

    async function filterModal(): Promise<void> {
        try {
            const splitDtIni = dtIni.split('-')
            console.log('splitDtIni', splitDtIni);
            const response = await api.get(`/users/${user.data.id}/listDeposits?month=${splitDtIni[1]}&year=${splitDtIni[0]}`)
            setDataResponse(response.data.body.Deposits)
        } catch (error) {
            console.log('error', error)
        }
    }

    console.log('response', dataResponse)

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

            <div style={{ backgroundColor: '#27293d' }}>
                <h3>Extratos e Relatórios</h3>
                {/* <TextField sx={{ background: '#bcbcc2', marginTop: '-35px' }} type='date' size='small' variant='outlined' />
                <TextField sx={{ background: '#bcbcc2', marginTop: '-35px' }} type='date' size='small' variant='outlined' /> */}
                <Button onClick={() => setModalFilter(true)}
                    sx={{ marginTop: '-25px', backgroundColor: '#bcbcc2', color: 'black', height: '25px', marginRight: '10px' }}>
                    <FilterAltIcon />
                </Button>
                <Button
                    sx={{ marginTop: '-25px', backgroundColor: '#bcbcc2', color: 'black', height: '25px' }}>
                    <FilterAltOffIcon />
                </Button>
                <Divider sx={{ backgroundColor: '#bcbcc2', }} />
                <TableContainer component={Paper}>
                    <Table sx={{ backgroundColor: '#27293d', minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, color: '#bcbcc2' }}>Transação</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#bcbcc2' }} align="center">Nome</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#bcbcc2' }} align="center">Data</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#bcbcc2' }} align="center">Valor</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#bcbcc2' }} align="center">Conta</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#bcbcc2' }} align="center">Banco</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listAccountsTemp.map((row) => (
                                <TableRow
                                    key={row.transactionId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ color: '#bcbcc2' }} component="th" scope="row">
                                        {row.transactionId}
                                    </TableCell>
                                    <TableCell sx={{ color: '#bcbcc2' }} align="center">
                                        {row.userName}
                                    </TableCell>
                                    <TableCell sx={{ color: '#bcbcc2' }} align="center">{row.date}</TableCell>
                                    <TableCell sx={{ color: '#bcbcc2' }} align="center">{row.value}</TableCell>
                                    <TableCell sx={{ color: '#bcbcc2' }} align="center">{row.account}</TableCell>
                                    <TableCell sx={{ color: '#bcbcc2' }} align="center">{row.bank}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Dialog
                open={modalFilter}
                onClose={() => setModalFilter(false)}>
                <DialogTitle>Filtro</DialogTitle>

                <DialogContent sx={{ width: '300px', height: '120px' }}>

                    <Typography style={{ fontSize: '15px', marginBottom: '10px' }}>Filtrar pelo mês e ano</Typography>
                    <TextField onChange={(event) => setDtIni(event.target.value)} sx={{ width: '180px' }} type='date' variant='outlined' />
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