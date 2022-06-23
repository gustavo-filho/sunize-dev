import React, { useState } from 'react'
import { ModalTransfer } from '../components/modal-transfer/modal-transfer-component'



import { Container, Content, MoneyArt } from './withdraw-accounts-styles'

const WithdrawalAccounts = ({
  data,
  setBankingAccounts,
  bankingAccounts,
  balanceAvailable,
}:any ) => {
  const [modalTransfer, setModalTransfer] = useState(false)

  return (
    <Container>
      <Content onClick={() => setModalTransfer(!modalTransfer)}>
        <div className="MoneyArtWrapper">
          <MoneyArt>
            <p>$</p>
          </MoneyArt>
        </div>
        <div className="AccountInformation">
          <p className="Bank">
            {data.BankData.Bank} - {data.BankData.Bankname}
          </p>
          <p>
            Agência: {data.BankData.Agency}-
            {data.BankData.AgencyDigit && data.BankData.AgencyDigit}
          </p>
          <p>
            Conta: {data.BankData.Account}-{data.BankData.AccountDigit}
          </p>
          <p>Tipo de Conta: {data.BankData.AccountType}</p>
        </div>
      </Content>
      <ModalTransfer
        modal={modalTransfer}
        setModal={setModalTransfer}
        data={data}
        balance={balanceAvailable}
      />
    </Container>
  )
}

export default WithdrawalAccounts
