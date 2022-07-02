// eslint-disable prettier/prettier
import React, { useEffect, useState } from 'react'
import { Container } from './styles'

import { WithdrawalRow } from './withdrawalrow/withdrawalrow-component'
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component'
import { api } from '@shared/services/api'
import { useAppSelector } from '../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { wrapperNavigation } from '../components/wrapper-navigation.component'
import { transactionDataType } from '../types/account-statements-transaction-data-types'

export function AccountStatements(): JSX.Element {
    const [data, setData] = useState<transactionDataType[]>([])
    const user = useAppSelector(userSelector);

    useEffect(() => {
        api
            .get(`/users/${user.data.id}/transactions`)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((e) => {
                console.warn(e)
            })
    }, [user.data.id])

    return (
        <>
            <Container>
                <h2>Extrato e Relatórios</h2>
                <p>
                    Informações sobre seu saldo disponível e extratos dos saques
                    realizados.
                </p>
                <div className="wrapperNavigation">
                    {wrapperNavigation()}
                </div>

                <div className="WrapperStatements">
                    {data.map((v: transactionDataType, k: number) => (
                        <WithdrawalRow key={k} {...v} />
                    ))}
                    <WithdrawalRow
                        transactionId={45615189}
                        date="25/43/1101"
                        value="R$ 500,00"
                        account="984152-1"
                        bank="Inter"
                        userName="Roberta"
                    />
                    <WithdrawalRow
                        transactionId={45615189}
                        date="25/43/1101"
                        value="R$ 500,00"
                        account="984152-1"
                        bank="Inter"
                        userName="Roberta"
                    />
                </div>
                <CopyrightFooter />
            </Container>
        </>
    )
}