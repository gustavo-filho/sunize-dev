// @ts-nocheck

import { useAppSelector } from '../../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid'
import {
  Options,
  Center,
  FormGroup,
  HeadInfo,
  Container,
  useStyles,
} from './sale-record.style';
import { Field, Form, Formik } from 'formik';
import { FaCog } from 'react-icons/fa';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';
import { toast } from 'react-toastify';
import { api } from '@shared/services/api';
import { DetailsModal } from '@shared/components/details-modal/details-modal.component';
import { ModalConfirm } from '@domain/dashboard/sales/components/modal-confirm/modal-confirm.component';
import { RefundModal } from '@domain/dashboard/sales/components/refund-modal/refund-modal.component';
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Transaction {
  affiliate: { name: string };
  affiliate_id: number;
  affiliate_value: number | null;
  client: { name: string };
  client_id: number;
  createdAt: string;
  id: number;
  paymentMethod: string;
  producer: { name: string };
  product: { title: string };
  status: 'Pagamento Autorizado';
}
interface SalesData {
  products: [Transaction];
  sales: number;
  total_sales: number;
}

export const SaleRecord = () => {
  const classes = useStyles();
  const user = useAppSelector(userSelector).data;
  const [dataModal, setDataModal] = useState<string | Transaction>('');
  const [modalConfirm, setModalConfirm] = useState<string | Transaction>('');
  const [detailsModal, setDetailsModal] = useState<string | Transaction>('');
  const [sales, setSales] = useState<SalesData>();
  const [userProducts, setUserProducts] = useState([]);

  const schema = Yup.object().shape({
    product: Yup.number().required('Escolha um produto'),
    time_start: Yup.string().required('Escolha a data de ínicio'),
    time_end: Yup.string().required('Escolha a data final'),
  });


  const tableHeader = [
    { titleHeader: 'Transação' },
    { titleHeader: 'Produto' },
    { titleHeader: 'Data' },
    { titleHeader: 'Comissão' },
    { titleHeader: 'Status' },
    { titleHeader: 'Comprador' },
    { titleHeader: 'Vendedor' },
    { titleHeader: 'Forma de Pagamento' },
    { titleHeader: 'Ações' },
  ]

  const listSalesMock = [
    {
      id: 1,
      produto: 'Trader esportivo',
      data: '19/02/2021',
      comissao: 'R$14,50',
      status: 'Aprovada',
      comprador: 'Fábio',
      vendedor: 'Léo',
      pagamento: 'Cartão de Crédito'
    },
    {
      id: 2,
      produto: 'Trader esportivo',
      data: '19/02/2021',
      comissao: 'R$14,50',
      status: 'Aprovada',
      comprador: 'Fábio',
      vendedor: 'Léo',
      pagamento: 'Cartão de Crédito'
    }
  ]

  const onSubmit = useCallback(
    async (values: string) => {
      const initDateArray = values.time_start.split('-');
      const initDate = `${initDateArray[2]}/${initDateArray[1]}/${initDateArray[0]}`;
      const endDateArray = values.time_end.split('-');
      const endDate = `${endDateArray[2]}/${endDateArray[1]}/${endDateArray[0]}`;

      try {
        const { data } = await api.get(
          `/dashboard/record-sales/${user.id}?product_id=${values.product}&time=${initDate}&endTime=${endDate}&status=${values.status}`,
          { headers: { 'sunize-access-token': user.access_token } },
        );
        setSales(data.data);
      } catch {
        toast.success('Parece que aconteceu um error :(', {
          autoClose: 5000,
        });
      }
    },
    [user.access_token, user.id],
  );

  const handleToggleRefundModal = useCallback(
    (id: number) => {
      if (sales) {
        const findTransaction = sales.products.filter(
          transaction => transaction.id === id,
        );

        if (
          findTransaction[0].paymentMethod === 'Boleto' ||
          findTransaction[0].paymentMethod === 'Pix'
        ) {
          setDataModal(findTransaction[0]);
        } else {
          setModalConfirm(findTransaction[0]);
        }
      }
    },
    [sales],
  );

  const getUserProducts = useCallback(async () => {
    const { data } = await api.get(
      `/users/${user.id}/products?page=0&paginate=5`,
    );

    setUserProducts(data.data);
  }, [user.id]);

  useEffect(() => {
    getUserProducts();
  }, [getUserProducts]);

  return (
    <>
      <Container>
        <h2>Registros de Vendas</h2>
        <p>Tenha controle total sobre o seu desempenho em nossa plataforma.</p>
        <Center>
          <div style={{ backgroundColor: '#27293d', width: '95%' }}>
            <h3>Relatório de Vendas</h3>
            <Formik
              initialValues={{
                product: '',
                time_start: '',
                time_end: '',
                status: 'Pagamento Autorizado',
              }}
              validationSchema={schema}
              onSubmit={onSubmit}
              render={({ errors, isValid, isSubmitting, touched }) => (
                <Form>
                  <FormGroup style={{ marginLeft: 15 }}>
                    <label>Período da venda</label>
                    <Field
                      name="time_start"
                      type="date"
                      placeholder="01/05/2020"
                    ></Field>
                    <p className="formError">
                      {touched.time_start && errors.time_start}
                    </p>
                  </FormGroup>

                  <p>até</p>

                  <FormGroup>
                    <Field
                      name="time_end"
                      type="date"
                      placeholder="05/01/2020"
                    ></Field>
                    <p className="formError">
                      {touched.time_end && errors.time_end}
                    </p>
                  </FormGroup>

                  <FormGroup style={{ minWidth: 150 }}>
                    <label>Produto</label>
                    <Field
                      name="product"
                      placeholder="Nome do produto"
                      as="select"
                    >
                      <option value="">-</option>
                      {userProducts &&
                        // @ts-ignore
                        userProducts.map((product: Product) => (
                          <option key={product.id} value={product.id}>
                            {product.title}
                          </option>
                        ))}
                    </Field>
                    <p className="formError">
                      {touched.product && errors.product}
                    </p>
                  </FormGroup>

                  <FormGroup>
                    <label>Valor</label>
                    <Field
                      name="value"
                      placeholder="R$ 10,00 - R$ 10.000,00"
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
                  {isSubmitting ? (
                    <button type="submit" disabled>
                      Filtrando...
                    </button>
                  ) : (
                    <button type="submit" disabled={!isValid || isSubmitting}>
                      {isSubmitting
                        ? 'Confirmando...'
                        : !isValid
                          ? 'Filtrar'
                          : isValid && 'Filtrar'}
                    </button>
                  )}
                </Form>
              )}
            />

            <Divider sx={{ backgroundColor: '#61616e' }} />

            <HeadInfo>
              <h2>
                <b>{sales ? sales.sales : 0}</b> vendas
              </h2>
              <span>
                {`Total líquido: `}
                <b>
                  {sales
                    ? sales.total_sales.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                    : 'R$ 0,00'}
                </b>
              </span>
            </HeadInfo>
            <Divider sx={{ backgroundColor: '#61616e', marginTop: '10px' }} />
            <TableContainer component={Paper}>
              <Table sx={{ backgroundColor: '#27293d', minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    {tableHeader.map((itemMap) => {
                      return (
                        <TableCell key={uuid()} sx={{ fontWeight: 600, color: '#bcbcc2' }} align="left">{itemMap.titleHeader}</TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>

                {listSalesMock.length > 0 && (
                  <>
                    {listSalesMock.map((row) => {
                      return (
                        <TableBody>
                          <TableRow className={classes.tableRow} w
                            key={uuid()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.produto}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.data}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.comissao}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.status}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} align="left">
                              {row.comprador}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.vendedor}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              {row.pagamento}
                            </TableCell>
                            <TableCell key={uuid()} sx={{ color: '#bcbcc2', paddingTop: '25px', paddingBottom: '25px' }} component="th" scope="row">
                              <Options>
                                <FaCog />
                                <ul>
                                  <li
                                    onClick={() =>
                                      handleToggleRefundModal(transaction.id)
                                    }
                                  >
                                    Reembolsar transação
                                  </li>
                                  <li onClick={() => setDetailsModal(transaction)}>
                                    Detalhes
                                  </li>
                                </ul>
                              </Options>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )
                    })}
                  </>
                )}
              </Table>
            </TableContainer>

            {/* <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Transação</th>
                    <th>Produto</th>
                    <th>Data</th>
                    <th>Comissão</th>
                    <th>Status</th>
                    <th>Comprador</th>
                    <th>Vendedor</th>
                    <th>Forma de Pagamento</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {sales &&
                    sales.products[0] &&
                    sales.products.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.product.title}</td>
                        <td>
                          {transaction.createdAt
                            .substring(0, 10)
                            .split('-')
                            .reverse()
                            .join('/')}
                        </td>
                        <td>
                          {transaction.affiliate_value
                            ? transaction.affiliate_value.toLocaleString(
                                'pt-BR',
                                {
                                  style: 'currency',
                                  currency: 'BRL',
                                },
                              )
                            : 'R$ 0,00'}
                        </td>
                        <td>{transaction.status}</td>
                        <td>{transaction.client.name}</td>
                        <td>{transaction.producer.name}</td>
                        <td>{transaction.paymentMethod}</td>
                        <Options>
                          <FaCog />
                          <ul>
                            <li
                              onClick={() =>
                                handleToggleRefundModal(transaction.id)
                              }
                            >
                              Reembolsar transação
                            </li>
                            <li onClick={() => setDetailsModal(transaction)}>
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
                    <td>Fábio</td>
                    <td>Léo</td>
                    <td>Cartão de Crédito</td>
                    <Options>
                      <FaCog />
                      <ul>
                        <li onClick={() => handleToggleRefundModal(1)}>
                          Reembolsar transação
                        </li>
                        <li>Detalhes</li>
                      </ul>
                    </Options>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Trader esportivo</td>
                    <td>19/02/2021</td>
                    <td>R$14,50</td>
                    <td>Aprovada</td>
                    <td>Fábio</td>
                    <td>Léo</td>
                    <td>Cartão de Crédito</td>
                    <Options>
                      <FaCog />
                      <ul>
                        <li onClick={() => handleToggleRefundModal(2)}>
                          Reembolsar transação
                        </li>
                        <li>Detalhes</li>
                      </ul>
                    </Options>
                  </tr>
                </tbody>
              </table>
            </TableContainer> */}
          </div>
        </Center>

        <CopyrightFooter />
      </Container>
      <RefundModal data={dataModal} setData={setDataModal} />
      <ModalConfirm data={modalConfirm} setData={setModalConfirm} />
      <DetailsModal data={detailsModal} setData={setDetailsModal} />
    </>
  );
};
