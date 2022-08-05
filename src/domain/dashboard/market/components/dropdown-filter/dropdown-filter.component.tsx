import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import { PropsDropDownFilter } from '../../interfaces/iprops-dropdown-filter.type';
import { Container } from './dropdown-filter.style';
export function DropdownFilter({
  setSelectedOrder,
  setSelectedFilter,
  categories,
}: PropsDropDownFilter) {
  const style = {
    color: 'gray',
    cursor: 'pointer',
  };

  const orderMenu = (
    <Menu
      className="menuDropDown"
      style={{
        minHeight: '130px',
        overflow: 'auto',
        backgroundColor: '#27293d',
      }}
      items={[
        {
          key: '1',
          label: '-',
          onClick: () => {
            setSelectedOrder('-');
          },
          style,
        },
        {
          key: '2',
          label: 'Do maior preço ao menor',
          onClick: () => {
            setSelectedOrder('topToBottom');
          },
          style,
        },
        {
          key: '3',
          label: 'Do menor preço ao maior',
          onClick: () => {
            setSelectedOrder('bottomToTop');
          },
          style,
        },
      ]}
    />
  );

  const filterMenu = (
    <Menu
      className="menuDropDown"
      style={{
        minHeight: '130px',
        overflow: 'auto',
        color: 'white',
        backgroundColor: '#27293d',
      }}
      items={[
        {
          key: '1',
          label: '-',
          onClick: () => {
            setSelectedFilter('');
          },
          style,
        },

        ...(categories || []).map(category => {
          return {
            key: category.title,
            label: category.title,
            onClick: () => {
              setSelectedFilter(category.title);
            },
            style,
          };
        }),
      ]}
    />
  );

  return (
    <Container>
      <Dropdown
        overlay={orderMenu}
        className="dropDownAnt"
        placement="bottomLeft"
      >
        <Button
          className="menuDropDown"
          style={{
            color: 'gray',
            borderColor: '#545455',
            backgroundColor: '#27293d',
          }}
        >
          Ordenar por
          <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown
        overlay={filterMenu}
        className="dropDownAnt"
        placement="bottomLeft"
      >
        <Button
          className="menuDropDown"
          style={{
            color: 'gray',
            borderColor: '#545455',
            backgroundColor: '#27293d',
          }}
        >
          Filtrar por
          <DownOutlined />
        </Button>
      </Dropdown>
    </Container>
  );
}
