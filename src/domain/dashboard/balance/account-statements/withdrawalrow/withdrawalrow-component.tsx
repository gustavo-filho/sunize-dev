// eslint-disable prettier/prettier
import React from 'react'
import { transactionDataType } from '../../types/account-statements-transaction-data-types'
import { Container } from './withdrawalrow-styles'

export const WithdrawalRow = ({
    transactionId,
    date,
    value,
    account,
    bank,
    userName,
}: transactionDataType) => {
    return (
        <div>
            <Container>
                <div className="Transaction">
                    <p>Transação</p>
                    <span>{transactionId}</span>
                </div>
                <div className="Date">
                    <p>Data</p>
                    <span>{date}</span>
                </div>
                <div className="Value">
                    <p>valor</p>
                    <span>{value}</span>
                </div>
                <div className="Account">
                    <p>Conta</p>
                    <span>{account}</span>
                </div>
                <div className="bank">
                    <p>Banco</p>
                    <span>{bank}</span>
                </div>
                <div className="name">
                    <p>Nome</p>
                    <span>{userName}</span>
                </div>
            </Container>
        </div>
    )
}