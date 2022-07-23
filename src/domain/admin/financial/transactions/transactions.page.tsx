import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FaCog } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import {
  Center,
  Container,
  HeadInfo,
  Options,
  useStyles,
} from './transactions.styles';

export const Transactions = () => {
  const classes = useStyles();

  const tableHeader = [
    { titleHeader: 'Transação' },
    { titleHeader: 'Produto' },
    { titleHeader: 'Data' },
    { titleHeader: 'Comissão' },
    { titleHeader: 'Status' },
    { titleHeader: 'Comprador' },
    { titleHeader: 'Vendedor' },
    { titleHeader: 'Forma de Pagamento Forma de Pagamento' },
    { titleHeader: 'Ações' },
  ];

  const listSalesMock = [
    {
      id: 1,
      produto: 'Trader esportivo',
      data: '19/02/2021',
      comissao: 'R$14,50',
      status: 'Aprovada',
      comprador: 'Fábio',
      vendedor: 'Léo',
      pagamento: 'Cartão de Crédito',
    },
    {
      id: 2,
      produto: 'Trader esportivo',
      data: '19/02/2021',
      comissao: 'R$14,50',
      status: 'Aprovada',
      comprador: 'Fábio',
      vendedor: 'Léo',
      pagamento: 'Cartão de Crédito Cartão de Crédito ',
    },
  ];

  return (
    <>
      <Container>
        <h2>Transações</h2>
        <p>Tenha controle total sobre o desempenho da plataforma.</p>
        <Center>
          <div
            style={{
              backgroundColor: '#27293d',
              width: '95%',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <h3>Relatório de Vendas</h3>

            <HeadInfo>
              <h2>
                <b>0</b> vendas
              </h2>
              <span>
                {`Total líquido: `}
                <b>R$ 0,00</b>
              </span>
            </HeadInfo>
            <Divider sx={{ borderColor: '#34364b', marginTop: '10px' }} />
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: '#27293d' }}
            >
              <Table
                sx={{ backgroundColor: '#27293d', minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow className={classes.tableRowHead}>
                    {tableHeader.map(itemMap => {
                      return (
                        <TableCell
                          key={uuid()}
                          sx={{
                            fontWeight: 600,
                            color: '#bcbcc2',
                            textTransform: 'uppercase',
                            maxWidth: '120px',
                          }}
                          align="left"
                        >
                          {itemMap.titleHeader}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                {listSalesMock.length > 0 && (
                  <TableBody>
                    {listSalesMock.map(row => {
                      return (
                        <TableRow
                          className={classes.tableRow}
                          key={uuid()}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.produto}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.data}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.comissao}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.status}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            align="left"
                          >
                            {row.comprador}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.vendedor}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {row.pagamento}
                          </TableCell>
                          <TableCell
                            key={uuid()}
                            sx={{
                              color: '#bcbcc2',
                              paddingTop: '25px',
                              paddingBottom: '25px',
                              maxWidth: '120px',
                            }}
                            component="th"
                            scope="row"
                          >
                            <Options>
                              <FaCog />
                              <ul>
                                <li>Reembolsar transação</li>
                                <li>Detalhes</li>
                              </ul>
                            </Options>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </div>
        </Center>
      </Container>
    </>
  );
};
