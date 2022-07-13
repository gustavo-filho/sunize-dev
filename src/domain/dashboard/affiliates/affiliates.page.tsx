import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userSelector } from '@domain/auth/user/user.store';
import {
  Container,
  Statistics,
  useStyles,
  FormGroup,
} from './affiliates.styles';
import { Product } from '@shared/types/types';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ASYNC_GET_PRODUCTS,
  productSelector,
} from '@domain/dashboard/products/products.store';
import * as Yup from 'yup';
import { AffiliatesContainer } from '@domain/dashboard/affiliates/components/affiliates-container/affiliates-container.component';
import { RequestAffiliateContainer } from '@domain/dashboard/affiliates/components/request-affiliate-container/request-affiliate-container.component';
import { Form, Formik } from 'formik';
import { InputSearch } from '@shared/components/input-search/input-search.component';
import { SelectProduct } from '@domain/dashboard/affiliates/components/select-product/select-product.component';
import { AppBar, Tab, Tabs } from '@mui/material';
import { CopyrightFooter } from '@domain/dashboard/components/copyright-footer/copyright-footer.component';

export const AffiliatesPage = () => {
  const user = useAppSelector(userSelector).data;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const [wordToSearch, setWordToSearch] = useState('');

  const products = useAppSelector(productSelector).data;

  const [totalOfAffiliates, setTotalOfAffiliates] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const schema = Yup.object().shape({
    search: Yup.string().required('Preencha algum valor'),
  });
  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  const renderQuantity = () => {
    const hashMap = [
      {
        quantity: totalOfAffiliates,
        label: totalOfAffiliates > 1 ? 'afiliados' : 'afiliado',
      },
      {
        quantity: totalOfAffiliates,
        label:
          totalOfAffiliates > 1
            ? 'pedidos de afiliados'
            : 'pedido de afiliados',
      },
    ];

    return (
      <strong>{`${hashMap[activeTab].quantity} ${hashMap[activeTab].label}`}</strong>
    );
  };

  const tabs = [
    {
      index: 0,
      title: 'Afiliados',
      description:
        'Tenha controle sobre os afiliados dos seus produtos digitais.',
      counter: renderQuantity,
      label: 'Afiliados',
      component: (
        <AffiliatesContainer
          activeTab={activeTab}
          selectedProduct={selectedProduct}
          user={user}
          setTotalOfAffiliates={setTotalOfAffiliates}
          wordToSearch={wordToSearch}
        />
      ),
    },
    {
      index: 1,
      title: 'Pedido de afiliados',
      description:
        'Tenha controle sobre os afiliados dos seus produtos digitais.',
      counter: renderQuantity,
      label: 'Pedidos de afiliados',
      component: (
        <RequestAffiliateContainer
          activeTab={activeTab}
          selectedProduct={selectedProduct}
          user={user}
          setTotalOfAffiliates={setTotalOfAffiliates}
          wordToSearch={wordToSearch}
        />
      ),
    },
  ];
  const onSubmit = useCallback(() => {}, []);

  useEffect(() => {
    dispatch(ASYNC_GET_PRODUCTS({ userId: user.id }));
  }, [dispatch, user.id]);

  return (
    <Container>
      <h1>{tabs[activeTab].title}</h1>
      <h2>{tabs[activeTab].description}</h2>

      <header>
        <Statistics>
          {tabs[activeTab].counter && tabs[activeTab].counter()}

          <div>
            <Formik
              initialValues={{ search: '' }}
              validationSchema={schema}
              onSubmit={onSubmit}
              render={() => (
                <Form>
                  <FormGroup>
                    <InputSearch
                      name="search"
                      placeholder="Pesquisar Afiliado"
                      value={wordToSearch}
                      onChange={(event: any) =>
                        setWordToSearch(event.target.value)
                      }
                    />
                  </FormGroup>
                </Form>
              )}
            />
          </div>
        </Statistics>
      </header>
      <SelectProduct
        products={products}
        activeProduct={selectedProduct}
        setActiveProduct={
          setSelectedProduct as Dispatch<SetStateAction<Product>>
        }
      />
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          className={classes.tabs}
          value={activeTab}
          onChange={(_, tab) => setActiveTab(tab)}
          aria-label="table-tabs"
        >
          {tabs.map(tab => (
            <Tab
              key={tab.index}
              label={tab.label}
              {...a11yProps(tab.index)}
              className={classes.tab}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabs[activeTab]?.component}
      <CopyrightFooter limitWidth={1210} />
    </Container>
  );
};
