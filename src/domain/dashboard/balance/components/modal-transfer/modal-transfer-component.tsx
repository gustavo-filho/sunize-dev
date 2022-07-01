import React, { useCallback, useState } from 'react'
import Cookies from 'js-cookie'
import { FaTimes } from 'react-icons/fa'
import CurrencyInput from 'react-currency-input-field'
import { history } from './history'
import { modalTransferType } from '../modal-add-account/types/modal-transfer.type'
import {
  Container,
  ContentModal,
  FormGroup,
  Overlay,
  MoneyArt,
  Error,
} from './modal-transfer-style'
import { accountInformationModalTransfer } from '../modal-add-account/types/modal-transfer-account-information.types'

export function ModalTransfer({ modal, setModal, data, balance }: modalTransferType) {
  const [error, setError] = useState<string | null>(null)
  const [valueMoney, setValueMoney] = useState<string | undefined>('')

  const onSubmit = useCallback(() => {
    if (valueMoney) {
      if (parseFloat(valueMoney) < 20) {
        setError('Valor mínimo de R$20')
      } else {
        setError('')

        Cookies.set('@Sunize_bankData', JSON.stringify(data), {
          expires: (1 / 1440) * 5,
        })

        Cookies.set('@Sunize_transferValue', String(valueMoney), {
          expires: (1 / 1440) * 5,
        })

        history.push('/dashboard/saldo/validar-informacoes')
      }
    } else {
      setError('Você precisa colocar um valor')
    }
  }, [setError, valueMoney, data])

  const validateMoney = useCallback((value?: string) => {
    setValueMoney(value)
  }, [])

  /**
   * Account information function.
   * @param account 
   * @returns 
   */
  function accountInformation(account: accountInformationModalTransfer): JSX.Element {
    return (
      <>
        <strong>
          {account.BankData.Bank} - {account.BankData.Bankname}
        </strong>
        <p>
          Agência: {account.BankData.Agency}
          {account.BankData.AgencyDigit && `-${account.BankData.AgencyDigit}`}
        </p>
        <p>
          Conta: {account.BankData.Account}-{account.BankData.AccountDigit}
        </p>
        <p>Tipo de Conta: {account.BankData.AccountType}</p>
      </>
    )
  }

  /**
   * Function referring to Current Input
   * @returns 
   */
  function currenctInput(): JSX.Element {
    return (
      <>
        <CurrencyInput
          autoFocus
          id="value"
          name="value"
          placeholder="0,00"
          decimalScale={2}
          allowNegativeValue={false}
          onValueChange={(value) => validateMoney(value)}
          prefix="R$ "
          maxLength={6}
        />
      </>
    )
  }

  return (
    <>
      {modal && (
        <Container>
          <ContentModal>
            <button>
              <FaTimes onClick={() => setModal(false)} />
            </button>
            <h1>Transferência</h1>
            <h1>Conta Selecionada</h1>
            <MoneyArt>
              <p>$</p>
            </MoneyArt>
            {accountInformation(data)}
            {currenctInput()}
            {error && <Error>{error}</Error>}

            <p>
              Saldo disponível para saque:{' '}
              <b>
                {balance !== 0
                  ? balance.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  : 'R$ 0,00'}
              </b>
            </p>
            
            <FormGroup>
              <button type="submit" onClick={onSubmit}>
                Transferir
              </button>
            </FormGroup>
          </ContentModal>
          <Overlay onClick={() => setModal(!modal)}></Overlay>
        </Container>
      )}
    </>
  )
}
