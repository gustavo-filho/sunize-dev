import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component'
import { api } from '@shared/services/api'
import { useAppSelector } from '../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { wrapperNavigation } from '../components/wrapper-navigation.component'
import { transactionDataType } from '../types/account-statements-transaction-data-types'
import { Card, Center, TableContainer } from '@domain/dashboard/sales/sale-record/sale-record.style'

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
    const [accountStatementsdata, setAccountStatementsdata] = useState<transactionDataType[]>(listAccountsTemp)
    const user = useAppSelector(userSelector);

    useEffect(() => {
        api
            .get(`/users/${user.data.id}/transactions`)
            .then((res) => {
                setAccountStatementsdata(res.data.data)
            })
            .catch((e) => {
                console.warn(e)
            })
    }, [user.data.id])

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
                <Center>
                    <Card>
                        <h3>Extratos e Relatórios</h3>
                        <TableContainer>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Transação</th>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th>Valor</th>
                                        <th>Conta</th>
                                        <th>Banco</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {accountStatementsdata &&
                                        accountStatementsdata.map(transaction => (
                                            <tr key={transaction.transactionId}>
                                                <td>{transaction.transactionId}</td>
                                                <td>{transaction.userName}</td>
                                                <td>
                                                    {transaction.date}
                                                </td>
                                                <td>
                                                    {transaction.value}
                                                </td>
                                                <td>{transaction.account}</td>
                                                <td>{transaction.bank}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </TableContainer>
                    </Card>
                </Center>
                <CopyrightFooter />
            </Container>
    )
}