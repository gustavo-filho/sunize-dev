import React, { useState } from 'react'
import { ModalEditAccount } from '../components/modal-edit-account/modal-edit-account-component'
import { ModalTransfer } from '../components/modal-transfer/modal-transfer-component'
import { withdrawalAccountsType } from '../types/withdrawal-accounts.type'
import { Container, Content, MoneyArt } from './withdraw-accounts-styles'

export function WithdrawalAccounts({
  dataBanking,
}: withdrawalAccountsType) {
  const [modalEditAccount, setModalEditAccount] = useState(false)

  return (
    <Container>
      <Content onClick={() => setModalEditAccount(!modalEditAccount)}>
        <div className="MoneyArtWrapper">
          <MoneyArt>
            <p>$</p>
          </MoneyArt>
        </div>
        <div className="AccountInformation">
          <p className="Bank">
            {dataBanking.BankData.Bank} - {dataBanking.BankData.Bankname}
          </p>
          <p>
            Agência: {dataBanking.BankData.Agency}-
            {dataBanking.BankData.AgencyDigit && dataBanking.BankData.AgencyDigit}
          </p>
          <p>
            Conta: {dataBanking.BankData.Account}-{dataBanking.BankData.AccountDigit}
          </p>
          <p>Tipo de Conta: {dataBanking.BankData.AccountType}</p>
        </div>
      </Content>

      <ModalEditAccount
        modal={modalEditAccount}
        setModal={setModalEditAccount}
        dataUpdateBanking={dataBanking}
      />
    </Container>
  )
}

