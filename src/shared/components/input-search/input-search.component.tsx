import { Content, Container } from './input-search.styles';
import { ReactComponent as Loupe } from '../../assets/images/loupe.svg';
import { useState } from 'react';

export const InputSearch = ({ ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Content isFocused={Number(isFocused)}>
        <input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Loupe />
      </Content>
    </Container>
  );
};
