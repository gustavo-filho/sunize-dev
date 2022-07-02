import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '@shared/services/api';
import { ModalTransfer } from '../components/modal-transfer/modal-transfer-component';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { Container, AddAccount, Value } from './current.balance.styles'
import { listBanks } from '../listBanks'
import { userSelector } from '@domain/auth/user/user.store';
import { useAppSelector } from '../../../../store/hooks';
import { WithdrawalAccounts } from '../withdrawal-accounts/withdraw-accounts-component';
import { ModalAddAccount } from '../components/modal-add-account/modal-add-account-component';
import { ballanceValuesType } from '../types/current-ballance-values.type';
import { bankingAccountsType } from '../types/current-ballance-banking-accounts.type';
import { wrapperNavigation } from '../components/wrapper-navigation.component';

export function CurrentBalance(): JSX.Element {
  const user = useAppSelector(userSelector);
  const [modalAddAccount, setModalAddAccount] = useState(false)
  const [modalTransfer, setModalTransfer] = useState(false)
  const [isShowBalance, setIsShowBalance] = useState(true)
  const [isShowRelease, setIsShowRelease] = useState(true)
  const [isShowAvailable, setIsShowAvailable] = useState(true)
  const [bankingAccounts, setBankingAccounts] = useState<bankingAccountsType[]>([])
  const [loading, setLoading] = useState(false)
  const [balanceValues, setBalanceValues] = useState<ballanceValuesType>({
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
        const bank = listBanks.find(
          (element: { name: string, value: string | number }) =>
            element.value === Number(response.data.data.BankData.Bank),
        )
        response.data.data.BankData.Bankname = bank?.name
        setBankingAccounts([response.data.data])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [user.data.access_token, user.data.id])

  useEffect(() => {
    getBankingAccounts()
    api.get(`users/balance/${user.data.id}`).then((res) => {
      const balance = {
        balance: res.data.data.AmountReceived,
        release: res.data.data.AmountPreviewTotal,
        available: res.data.data.AmountAvailableToday,
      }
      setBalanceValues(balance)
    })
      .catch(() => {
        toast.error('Tivemos um problema na requisição do seu Saldo, favor entre em contato com o suporte')
      })
  }, [getBankingAccounts, user.data.id])

  function totalBallanceComponent(labelDisplayed: string): JSX.Element {
    return (
      <div style={{ color: 'green' }} className="totalBalance">
        <p>
          {labelDisplayed}{' '}
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
    )
  }

  function futureReleases(labelDisplayed: string): JSX.Element {
    return (
      <div style={{ color: '#c27c2c' }} className="FutureLauch">
        <p>
          {labelDisplayed}{' '}
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
    )
  }

  function availableForWithdrawal(labelDisplayed: string): JSX.Element {
    return (
      <div style={{ color: 'green' }} className="withdrawalAvailable">
        <p>
          {labelDisplayed}{' '}
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
    )
  }

  function buttonTransfer(labelDisplayed: string): JSX.Element {
    return (
      <>
        <button
          onClick={() =>
            bankingAccounts.length
              ? setModalTransfer(true)
              : toast.error('Você não possui nenhuma conta bancária cadastrada.')
          }
          className="btnTransfer">
          $ {labelDisplayed}
        </button>
      </>
    )
  }

  function ballanceComponent(): JSX.Element {
    return (
      <div className="balance">
        <div className="contentBalance">
          {totalBallanceComponent('Saldo Total')}
          {futureReleases('Lançamentos Futuro')}
          {availableForWithdrawal('Disponível para Saque')}
          {buttonTransfer('Transfira agora')}
        </div>
      </div>
    )
  }

  function alignAccounts(): JSX.Element {
    return (
      <div className="AlignAccounts">
        {bankingAccounts.length ? (
          bankingAccounts.map((bankAccount: any) => (
            <WithdrawalAccounts
              key={bankAccount.BankData.Bank}
              data={bankAccount}
              balanceAvailable={balanceValues.available}
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
    )
  }

  function addAccount(): JSX.Element {
    return (
      <AddAccount>
        {!bankingAccounts[0] && (
          <button onClick={() => setModalAddAccount(true)} type="button">
            Adicionar novas contas para saque
          </button>
        )}
      </AddAccount>
    )
  }

  function modalTransferFunc(): JSX.Element {
    return (
      <ModalTransfer
        modal={modalTransfer}
        setModal={setModalTransfer}
        data={bankingAccounts[0]}
        balance={balanceValues.available}
      />
    )
  }

  function modalAddAccountFunc(): JSX.Element {
    return (
      <ModalAddAccount
        modal={modalAddAccount}
        setModal={setModalAddAccount}
      />
    )
  }

  return (
    <Container>
      <h2>Saldo e Extratos</h2>

      <p>
        Informações sobre seu saldo disponível e extratos dos saques
        realizados.
      </p>

      {wrapperNavigation()}

      {ballanceComponent()}

      <h3>Contas disponíveis para saque</h3>

      {alignAccounts()}

      {addAccount()}

      <CopyrightFooter limitWidth={1100} />

      {modalTransferFunc()}

      {modalAddAccountFunc()}

    </Container>
  )
}