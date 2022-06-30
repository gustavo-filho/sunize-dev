import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { NavLink } from 'react-router-dom'

// Utils
import { api } from '@shared/services/api';

// Components
import { ModalTransfer } from '../components/modal-transfer/modal-transfer-component';

import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

import { Container, AddAccount, Value } from './current.balance.styles'

import { bankTypes } from '../bankTypes'

import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../store/hooks';
import WithdrawalAccounts from '../withdrawal-accounts/withdraw-accounts-component';
import { ModalAddAccount } from '../components/modal-add-account/modal-add-account-component';
import { WrapperNavigation } from '../balance.styles';


export const CurrentBalance = (): JSX.Element => {
  const user = useAppSelector(userSelector);
  const [modalAddAccount, setModalAddAccount] = useState(false)
  const [modalTransfer, setModalTransfer] = useState(false)

  const [isShowBalance, setIsShowBalance] = useState(true)
  const [isShowRelease, setIsShowRelease] = useState(true)
  const [isShowAvailable, setIsShowAvailable] = useState(true)
  const [bankingAccounts, setBankingAccounts] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const [balanceValues, setBalanceValues] = useState({
    balance: 0,
    release: 0,
    available: 0,
  })

  const getBankingAccounts = useCallback(() => {
    setLoading(true)
    api
      .get(`users/${user.data.id}/safe2pay/sub-accounts`, {
        headers: { 'sunize-access-token': user.data.access_token },
      })
      .then((response) => {
        const bank = bankTypes.find(
          (element: any) =>
            element.value === Number(response.data.data.BankData.Bank),
        )
        response.data.data.BankData.Bankname = bank?.name
        setBankingAccounts([response.data.data])
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [user.data.access_token, user.data.id])

  useEffect(() => {
    getBankingAccounts()
    api
      .get(`users/balance/${user.data.id}`)
      .then((res) => {
        const balance = {
          balance: res.data.data.AmountReceived,
          release: res.data.data.AmountPreviewTotal,
          available: res.data.data.AmountAvailableToday,
        }
        setBalanceValues(balance)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [getBankingAccounts, user.data.id])

  return (
    <Container>
      <h2>Saldo e Extratos</h2>
      <p>
        Informações sobre seu saldo disponível e extratos dos saques
        realizados.
      </p>
      <WrapperNavigation>
        <NavLink to="/dashboard/saldo" exact activeClassName="active">
          Saldo
        </NavLink>
        <NavLink to="/dashboard/saldo/extrato" exact activeClassName="active">
          Extratos e Relatórios
        </NavLink>
      </WrapperNavigation>
      <div className="balance">
        <div className="contentBalance">
          <div className="totalBalance">
            <p>
              Saldo Total{' '}
              <b onClick={() => setIsShowBalance(!isShowBalance)}>
                {!isShowBalance ? 'Esconder' : 'Mostrar'}
              </b>
            </p>

            <Value show={isShowBalance}>
              {!isShowBalance
                ? balanceValues.balance.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }) ?? 'Indisponível'
                : ''}
            </Value>
          </div>

          <div className="FutureLauch">
            <p>
              Lançamentos Futuro{' '}
              <b onClick={() => setIsShowRelease(!isShowRelease)}>
                {!isShowRelease ? 'Esconder' : 'Mostrar'}
              </b>
            </p>
            <Value show={isShowRelease}>
              {!isShowRelease
                ? balanceValues.release.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }) ?? 'Indisponível'
                : ''}
            </Value>
          </div>

          <div className="withdrawalAvailable">
            <p>
              Disponível para Saque{' '}
              <b onClick={() => setIsShowAvailable(!isShowAvailable)}>
                {!isShowAvailable ? 'Esconder' : 'Mostrar'}
              </b>
            </p>
            <Value show={isShowAvailable}>
              {!isShowAvailable
                ? balanceValues.available.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }) ?? 'Indisponível'
                : ''}
            </Value>
          </div>
          <button
            onClick={() =>
              bankingAccounts.length
                ? setModalTransfer(true)
                : toast.error('Você não possui nenhuma conta bancária cadastrada.')
            }
            className="btnTransfer"
          >
            $ Transfira agora
          </button>
        </div>
      </div>

      <h3>Contas disponíveis para saque</h3>

      <div className="AlignAccounts">
        {bankingAccounts.length ? (
          bankingAccounts.map((bankAccount: any) => (
            <WithdrawalAccounts
              key={bankAccount.BankData.Bank}
              data={bankAccount}
              balanceAvailable={balanceValues.available}
              setBankingAccounts={setBankingAccounts}
              bankingAccounts={bankingAccounts}
            />
          ))
        ) : (
          <span style={{ marginBottom: 20 }}>
            {loading ? (
              <DotsLoader />
            ) : (
              'Você não tem nenhuma conta bancária cadastrada.'
            )}
          </span>
        )}
      </div>

      <AddAccount>
        {!bankingAccounts[0] && (
          <button onClick={() => setModalAddAccount(true)} type="button">
            Adicionar novas contas para saque
          </button>
        )}
      </AddAccount>
      <CopyrightFooter limitWidth={1100} />
      <ModalTransfer
        modal={modalTransfer}
        setModal={setModalTransfer}
        data={bankingAccounts[0]}
        balance={balanceValues.available}
      />
      <ModalAddAccount
        modal={modalAddAccount}
        setModal={setModalAddAccount}
      />
    </Container>
  )
}