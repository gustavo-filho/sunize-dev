
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PropsDropDownFilter } from '../../interfaces/iprops-dropdown-filter.type';
import { Container } from './dropdown-filter.style';

export function DropdownFilter({
  setSelectedOrder,
  setSelectedFilter,
  categories,
}: PropsDropDownFilter) {
  const orderMenu = (
    <Menu
      className="menuDropDown"
      style={{
        height: '130px',
        overflow: 'auto',
        backgroundColor: '#27293d',
      }}
    >
      <Menu.Item
        key="1"
        style={{
          color: 'gray',
        }}
        onClick={() => {
          setSelectedOrder('')
        }}
      >
        -
      </Menu.Item>
      <Menu.Item
        key="2"
        style={{
          color: 'gray',
        }}
        onClick={() => {
          setSelectedOrder('topToBottom')
        }}
      >
        Do maior preço ao menor
      </Menu.Item>
      <Menu.Item
        key="3"
        style={{
          color: 'gray',
        }}
        onClick={() => {
          setSelectedOrder('bottomToTop')
        }}
      >
        Do menor preço ao maior
      </Menu.Item>
    </Menu>
  )

  const filterMenu = (
    <Menu
      className="menuDropDown"
      style={{
        height: '250px',
        overflow: 'scroll',
        color: 'white',
        backgroundColor: '#27293d',
      }}
    >
      <Menu.Item
        key="1"
        style={{
          color: 'gray',
        }}
        onClick={() => {
          setSelectedFilter('')
        }}
      >
        -
      </Menu.Item>

      {categories &&
        categories.map((category: any) => (
          <Menu.Item
            key={category.title}
            style={{
              color: 'gray',
            }}
            onClick={() => {
              setSelectedFilter(category.title)
            }}
          >
            {category.title}
          </Menu.Item>
        ))}
    </Menu>
  )

  return (
    <Container>
      <Dropdown overlay={orderMenu} className="dropDownAnt">
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
      <Dropdown overlay={filterMenu} className="dropDownAnt">
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
  )
}