import React, { CSSProperties, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Container } from './pagination.styles';

interface PaginationData {
  totalPages: number;
  offset: number;
  setOffset: CallableFunction;
  style?: CSSProperties;
}

const MAX_ITEMS = 5;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination: React.FC<PaginationData> = ({
  totalPages,
  offset,
  setOffset,
  style,
}) => {
  const first = Math.max(offset - MAX_LEFT, 1);

  const onPageChange = useCallback(
    (page: number) => {
      setOffset(page - 1);
    },
    [setOffset],
  );

  return (
    <Container total={totalPages} style={style && style}>
      <button onClick={() => setOffset(offset - 1)} disabled={offset === 0}>
        <FaChevronLeft />
      </button>
      {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
        .map((_, index) => index + first)
        .map(page => (
          <button
            onClick={() => onPageChange(page)}
            key={page}
            className={page - 1 === offset ? 'pagination-active' : ''}
          >
            {page}
          </button>
        ))}
      <button
        onClick={() => setOffset(offset + 1)}
        disabled={offset === totalPages - 1}
      >
        <FaChevronRight />
      </button>
      <div className="bar"></div>
    </Container>
  );
};

export default Pagination;
