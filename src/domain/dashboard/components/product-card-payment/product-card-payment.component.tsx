import React, { useRef } from 'react';
import { FaImage } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import LockSafe from '../../paymet/assets/lock-safe.png';
import { Container, Img, ProductImage, Voucher } from './product-card.styles';
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component';
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component';

export function ProductCard(): JSX.Element {
  const { product, applyVoucher, voucherApplied, removeVoucher } = usePayment();
  const { productId } = useParams();
  const inputVoucherRef = useRef<HTMLInputElement>(null);

  return (
    <Container>
      <header>
        <img src={LockSafe} alt="Compra Segura" />
        <span>
          Compra
          <br /> 100% segura
        </span>
      </header>
      <ProductImage>
        {product.image ? (
          <Img src={product.image} alt={product.title} />
        ) : (
          <FaImage />
        )}
      </ProductImage>
      <Voucher>
        {voucherApplied ? (
          <>
            <div className="voucher">
              <span>{voucherApplied}</span>
              <button
                type="button"
                onClick={() => {
                  removeVoucher();
                }}
              >
                X
              </button>
            </div>
          </>
        ) : (
          <div>
            <input ref={inputVoucherRef} type="text" placeholder="CUPOM" />

            <button
              type="button"
              onClick={() =>
                applyVoucher({
                  voucher: inputVoucherRef.current?.value ?? '',
                  productId: String(productId),
                })
              }
            >
              APLICAR
            </button>
          </div>
        )}
        <small>
          A Sunize está processando este pedido à serviço de [NOME], ao
          prosseguir você está concordando com os{' '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" target="_blank">
            Termos de compra.
          </a>
        </small>

        {!product.User ? (
          <DotsLoader style={{ marginTop: '2rem' }} />
        ) : (
          <p>
            <b>Autor:</b> {product.User.name} <br />
            Contato do(a) vendedor(a)<br></br>
            <a href={`mailto:${product.User.email ?? ''}`}>
              {product.User.email}
            </a>
            <br />
            <a
              href={`https://api.whatsapp.com/send?phone=55${product.User.phone.replace(
                /\D/g,
                '',
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              {product.User.phone}
            </a>
          </p>
        )}
      </Voucher>
    </Container>
  );
}
