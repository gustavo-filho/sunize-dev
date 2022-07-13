
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Container, Modal, Content } from './alert-popup.styles'
import { Props } from './interface/alert-popup-props-type'

export function AlertPopUp({ data, toggleModal, acceptDiscount }:Props): JSX.Element {
  function handleCloseModal() {
    toggleModal()
  }

  return (
    <>
      <Container>
        <Modal>
          <button type="button" onClick={handleCloseModal}>
            <FaTimes />
          </button>
          <h1>Ei, não vá! Temos uma promoção especial para você!</h1>
          <Content>
            <strong>
              Leve esse produto com um desconto de{' '}
              {data.type_of_discount.discount}%! Que tal?
            </strong>
            <h2>Por: R${data.finalPrice}</h2>
            <button
              onClick={() => {
                acceptDiscount()
                toggleModal()
              }}
            >
              É claro!
            </button>
          </Content>
        </Modal>
      </Container>
    </>
  )
}