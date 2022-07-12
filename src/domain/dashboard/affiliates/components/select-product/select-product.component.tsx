import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useStyles } from './select-product.styles';
import { FaChevronDown } from 'react-icons/fa';
import { Product } from '@shared/types/types';

export type Products = {
  id: number;
  value: string;
  name: string;
};

interface SelectProductProps {
  products: any;
  activeProduct: any;
  setActiveProduct: React.Dispatch<React.SetStateAction<Product>>;
}
export const SelectProduct = ({
  products,
  activeProduct,
  setActiveProduct,
}: SelectProductProps) => {
  const classes = useStyles();

  const handleSelectProduct = (event: any) => {
    const product = products.find(
      (element: any) => element.id === event.target.value,
    ) as unknown as Product;
    setActiveProduct(product);
  };
  return (
    <FormControl className={classes.root} variant="standard">
      <InputLabel>Selecione um produto</InputLabel>
      <Select
        value={activeProduct}
        id="product-select"
        className={classes.select}
        IconComponent={FaChevronDown}
        onChange={handleSelectProduct}
      >
        {products.map((product: any) => (
          <MenuItem key={product.id} value={product.id}>
            {product.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
