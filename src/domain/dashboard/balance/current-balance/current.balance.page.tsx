import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { wrapperNavigation } from '../components/wrapper-navigation.component';
import { IBankingAccountsType } from '../types/current-ballance-banking-accounts.type';
import { ballanceValuesType } from '../types/current-ballance-values.type';
import { WithdrawalAccounts } from '../withdrawal-accounts/withdraw-accounts-component';
import { AddAccount, Container, Value } from './current.balance.styles';
// import {
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Typography,
// } from '@mui/material';
import { AccountComponentModal } from '../components/accountComponentModal/account-component-modal';
import { listBanks } from '../config/list-banks';

export function CurrentBalance(): JSX.Element {
  const { user } = useUser();

  const [modalAddAccount, setModalAddAccount] = useState(false);
  const [isShowBalance, setIsShowBalance] = useState(true);
  const [isShowRelease, setIsShowRelease] = useState(true);
  const [, setModalTransfer] = useState(false);
  const [isShowAvailable, setIsShowAvailable] = useState(true);
  const [bankingAccounts, setBankingAccounts] = useState<
    IBankingAccountsType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [balanceValues, setBalanceValues] = useState<ballanceValuesType>({
    balance: 0,
    release: 0,
    available: 0,
  });

  const getBankingAccounts = useCallback(async () => {
    setLoading(true);
    await api
      .get(`users/${user!.id}/safe2pay/sub-accounts`, {
        headers: { 'sunize-access-token': user!.access_token },
      })
      .then(response => {
        const bank = listBanks.find(
          (element: { name: string; value: string | number }) =>
            element.value === Number(response.data.data.BankData.Bank),
        );
        response.data.data.BankData.Bankname = bank?.name;
        setBankingAccounts([response.data.data]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    getBankingAccounts();
    api
      .get(`users/balance/${user!.id}`)
      .then(res => {
        const balance = {
          balance: res.data.data.AmountReceived,
          release: res.data.data.AmountPreviewTotal,
          available: res.data.data.AmountAvailableToday,
        };
        setBalanceValues(balance);
      })
      .catch((error: any) => {
        console.log('error', error);
        if (
          error.response.data.message !==
          'Você deve cadastrar os seus dados da Safe2Pay'
        ) {
          toast.error(
            'Tivemos um problema na requisição do seu Saldo, favor entre em contato com o suporte',
          );
        } else {
          toast.error(
            'Favor realizar o cadastro da sua conta bancária, clicando no botão abaixo: "Adicionar novas contas..."',
          );
        }
      });
  }, [getBankingAccounts, user]);

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
    );
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
    );
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
    );
  }

  // function componentDailyWithdrawal(labelDisplayed: string): JSX.Element {
  //   return (
  //     <FormControl>
  //       <p>{labelDisplayed}</p>
  //       <RadioGroup
  //         style={{ marginTop: '-30px' }}
  //         row
  //         aria-labelledby="demo-row-radio-buttons-group-label"
  //         name="row-radio-buttons-group"
  //         defaultValue="false"
  //       >
  //         <FormControlLabel style={{ height: '2px', marginTop: '35px' }} value="true" control={<Radio style={{ color: '#818181', height: '2px' }} />} label={<Typography style={{ marginTop: '35px' }}>Sim</Typography>} />
  //         <FormControlLabel style={{ height: '2px', marginTop: '35px' }} value="false" control={<Radio style={{ color: '#818181', height: '2px' }} />} label={<Typography style={{ marginTop: '35px' }}>Não</Typography>} />
  //       </RadioGroup>
  //     </FormControl>
  //   )
  // }

  function ballanceComponent(): JSX.Element {
    return (
      <div className="balance">
        <div className="contentBalance">
          {totalBallanceComponent('Saldo Total')}
          {futureReleases('Lançamentos Futuro')}
          {availableForWithdrawal('Disponível para Saque')}

          <button
            onClick={() =>
              bankingAccounts.length
                ? setModalTransfer(true)
                : toast.error(
                    'Você não possui nenhuma conta bancária cadastrada.',
                  )
            }
            className="btnTransfer"
          >
            Transfira agora
          </button>
        </div>
      </div>
    );
  }

  function alignAccounts(): JSX.Element {
    return (
      <div className="AlignAccounts">
        {bankingAccounts.length ? (
          bankingAccounts.map((bankAccount: any) => (
            <WithdrawalAccounts
              key={bankAccount.BankData.Bank}
              dataBanking={bankAccount}
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
    );
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
    );
  }

  function accountComponentModal(): JSX.Element {
    return (
      <AccountComponentModal
        modal={modalAddAccount}
        setModal={setModalAddAccount}
        updateModal={false}
      />
    );
  }

  return (
    <Container>
      <h2>Saldo e Extratos</h2>

      <p>
        Informações sobre seu saldo disponível e extratos dos saques realizados.
      </p>

      {wrapperNavigation()}

      {ballanceComponent()}

      <h3>Conta disponível para saque</h3>

      {alignAccounts()}

      {addAccount()}

      <CopyrightFooter limitWidth={1100} />

      {accountComponentModal()}
    </Container>
  );
}
