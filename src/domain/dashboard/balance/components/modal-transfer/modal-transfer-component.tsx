import React, { useCallback, useState } from 'react'
import Cookies from 'js-cookie'
import { FaTimes } from 'react-icons/fa'

import CurrencyInput from 'react-currency-input-field'

import {
  Container,
  ContentModal,
  FormGroup,
  Overlay,
  MoneyArt,
  Error,
} from './modal-transfer-style'
import { history } from './history'

export function ModalTransfer({ modal, setModal, data, balance }: any) {
  const [error, setError] = useState<string | null>(null)
  const [valueMoney, setValueMoney] = useState('')

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

  const validateMoney = useCallback((value: any) => {
    setValueMoney(value)
  }, [])

  return (
    <>
      {modal && (
        <Container>
          <ContentModal>
            <button>
              <FaTimes onClick={() => setModal(false)} />
            </button>
            <h1>Retirar</h1>
            <h1>Conta Selecionada</h1>
            <MoneyArt>
              <p>$</p>
            </MoneyArt>
            <strong>
              {data.BankData.Bank} - {data.BankData.Bankname}
            </strong>
            <p>
              Agência: {data.BankData.Agency}
              {data.BankData.AgencyDigit && `-${data.BankData.AgencyDigit}`}
            </p>
            <p>
              Conta: {data.BankData.Account}-{data.BankData.AccountDigit}
            </p>
            <p>Tipo de Conta: {data.BankData.AccountType}</p>

            <CurrencyInput
              autoFocus
              id="value"
              name="value"
              placeholder="0,00"
              decimalScale={2}
              allowNegativeValue={false}
              onValueChange={(value) => validateMoney(value)}
              prefix="R$ "
            />
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

            <p>
              A taxa de transferência é de:
              <br />
              <b>R$ 3,50</b>
            </p>
            <FormGroup>
              <button type="submit" onClick={onSubmit}>
                Transferir
              </button>
            </FormGroup>
          </ContentModal>
          {/* <Overlay modal={modal} onClick={() => setModal(false)}></Overlay> */}
        </Container>
      )}
    </>
  )
}
