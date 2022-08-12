import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { CancelRecurringModal } from '@domain/dashboard/sales/components/cancel-recurring-modal/cancel-recurring-modal.component';
import { CancelRefundModal } from '@domain/dashboard/sales/components/cancel-refund-modal/cancel-refund-modal.component';
import { ModalConfirm } from '@domain/dashboard/sales/components/modal-confirm/modal-confirm.component';
import { DetailsModal } from '@shared/components/details-modal/details-modal.component';
import { useUser } from '@shared/contexts/user-context/user.context';
import { api } from '@shared/services/api';
import { Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import {
  Card,
  Center,
  Container,
  Divisor,
  FormGroup,
  HeadInfo,
  Options,
  TableContainer,
} from './purchase-record.styles';

interface Product {
  id: number;
  image: string;
  title: string;
}
interface Transaction {
  id: number;
  paymentMethod: string;
  product: Product;
  status: string;
  transaction_value: string;
}

export const PurchaseRecordPage = () => {
  const { user } = useUser();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function useFetch<Data = any, Error = any>(url: string, params?: any) {
    const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
      const response = await api.get(url, params);

      return response.data;
    });

    return { data, error, mutate };
  }

  const [detailsModal, setDetailsModal] = useState<string | Transaction>('');
  const [dataCancelRefundModal, setDataCancelRefundModal] = useState<
    string | Transaction
  >('');
  const [dataModalConfirm, setDataModalConfirm] = useState<
    string | Transaction
  >('');
  const [dataCancelRecurring, setDataCancelRecurring] = useState<
    string | Transaction
  >('');

  const { data, error } = useFetch(`users/${user?.id}/transactions`, {
    headers: { 'sunize-access-token': user!.access_token },
  });

  useEffect(() => {
    if (data) {
      setTransactions(data.data);
    }

    if (error) {
      toast.error('Houve um problema ao buscar as transações');
    }
  }, [data, error]);

  const toggleDetailsModal = useCallback(
    (id: number) => {
      const findTransaction = transactions.filter(
        transaction => transaction.id === id,
      );

      if (findTransaction[0]) setDetailsModal(findTransaction[0]);
    },
    [transactions],
  );

  const toggleCancelRecurringModal = useCallback(
    (id: number) => {
      const findTransaction = transactions.filter(
        transaction => transaction.id === id,
      );

      if (findTransaction[0]) setDataCancelRecurring(findTransaction[0]);
    },
    [transactions],
  );

  return (
    <>
      <Container>
        <h2>Registros de Compras</h2>
        <p>
          Tenha controle total sobre as suas aquisições em nossa plataforma.
        </p>
        <Center>
          <Card>
            <h3>Relatório de Compras</h3>
            <Formik
              initialValues={{
                product_type: 'todos_produtos',
                moeda: 'real',
                periodo: 'last_7',
              }}
              onSubmit={() => {}}
              render={() => (
                <Form>
                  <FormGroup style={{ marginLeft: 15 }}>
                    <label>Período da compra</label>
                    <Field
                      name="time_start"
                      type="date"
                      placeholder="01/05/2020"
                    ></Field>
                  </FormGroup>

                  <p>até</p>

                  <FormGroup>
                    <Field
                      name="time_end"
                      type="date"
                      placeholder="05/01/2020"
                    ></Field>
                  </FormGroup>

                  <FormGroup>
                    <label>Produto</label>
                    <Field name="product" placeholder="Nome do produto"></Field>
                  </FormGroup>

                  <FormGroup>
                    <label>Valor</label>
                    <Field
                      name="value"
                      placeholder="R$ 10,00 - R$ 5000,00"
                    ></Field>
                  </FormGroup>

                  <FormGroup>
                    <label>Status</label>
                    <Field name="status" as="select">
                      <option value="Pagamento Autorizado">
                        Transação Aprovada
                      </option>
                      <option value="Transação não efetuada">
                        Transação não efetuada
                      </option>
                      <option value="Pagamento Recusado">
                        Pagamento Recusado
                      </option>
                      <option value="Pagamento Pendente">
                        Pagamento Pendente
                      </option>
                    </Field>
                  </FormGroup>
                  <button type="submit">Filtrar</button>
                </Form>
              )}
            />

            <Divisor />

            <HeadInfo>
              <h2>
                <b>26</b> compras
              </h2>
              <h2>
                <b>26</b> reembolsadas
              </h2>
            </HeadInfo>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Transação</th>
                    <th>Produto</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Vendedor</th>
                    <th>Forma de Pagamento</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions[0] &&
                    transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.product.title}</td>
                        <td>01/05/2015</td>
                        <td>R$ 15,00</td>
                        <td>{transaction.status}</td>
                        <td>NomeDoVendedor</td>
                        <td>{transaction.paymentMethod}</td>
                        <Options>
                          <FaCog />
                          <ul>
                            {transaction.status === 'Pagamento Autorizado' && (
                              <li
                                onClick={() =>
                                  toggleCancelRecurringModal(transaction.id)
                                }
                              >
                                Cancelar recorrência
                              </li>
                            )}
                            {/* {transaction.status_refund === 'initial' ? (
                              <li
                                onClick={() =>
                                  toggleConfirmModal(transaction.id)
                                }
                              >
                                Reembolsar transação
                              </li>
                            ) : transaction.status_refund === 'pending' ? (
                              <li
                                onClick={() =>
                                  toggleCancelModal(transaction.id)
                                }
                              >
                                Cancelar contestação
                              </li>
                            ) : (
                              transaction.status_refund === 'done' && ''
                            )} */}

                            <li
                              onClick={() => toggleDetailsModal(transaction.id)}
                            >
                              Detalhes
                            </li>
                          </ul>
                        </Options>
                      </tr>
                    ))}
                  <tr>
                    <td>1</td>
                    <td>Trader esportivo</td>
                    <td>19/02/2021</td>
                    <td>R$14,50</td>
                    <td>Aprovada</td>
                    <td>Léo</td>
                    <td>Cartão de Crédito</td>
                    <Options>
                      <FaCog />
                      <ul>
                        <li>Reembolsar transação</li>
                        <li>Detalhes</li>
                      </ul>
                    </Options>
                  </tr>

                  <tr>
                    <td>1</td>
                    <td>Trader esportivo</td>
                    <td>19/02/2021</td>
                    <td>R$14,50</td>
                    <td>Em contestação</td>
                    <td>Léo</td>
                    <td>Cartão de Crédito</td>
                    <Options>
                      <FaCog />
                      <ul>
                        <li>Cancelar contestação</li>
                        <li>Detalhes</li>
                      </ul>
                    </Options>
                  </tr>

                  <tr>
                    <td>1</td>
                    <td>Trader esportivo</td>
                    <td>19/02/2021</td>
                    <td>R$14,50</td>
                    <td>Em contestação</td>
                    <td>Léo</td>
                    <td>Cartão de Crédito</td>
                    <Options>
                      <FaCog />
                      <ul>
                        <li>Cancelar recorrência</li>
                      </ul>
                    </Options>
                  </tr>
                </tbody>
              </table>
            </TableContainer>
          </Card>
        </Center>

        <CopyrightFooter />
      </Container>
      <CancelRefundModal
        data={dataCancelRefundModal}
        setData={setDataCancelRefundModal}
      />
      <ModalConfirm data={dataModalConfirm} setData={setDataModalConfirm} />
      <DetailsModal data={detailsModal} setData={setDetailsModal} />
      <CancelRecurringModal
        data={dataCancelRecurring}
        setData={setDataCancelRecurring}
      />
    </>
  );
};
