import { useEffect, useState } from 'react'

import { Container, Buttons, MainContent } from './notificationCoProduction.styles'

// import { useAuth } from 'hooks/useAuth'
// import { useToast } from 'hooks/Toast'

const NotificationCoProduction: any = ({
  resetNotifications,
  productId,
  producerId,
  id,
}: any) => {
  const [productName, setProductName] = useState('')
  const [producerName, setProducerName] = useState('')
  // const { user } = useAuth()
  // const { addToast } = useToast()

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await api.get(`products/${productId}`)
  //     setProductName(data.data.product.title)
  //     const producer = await api.get(`user/name/${producerId}`)
  //     setProducerName(producer.data.data.name)
  //   }
  //   fetchData()
  // }, [])

  // async function approveInvite() {
  //   try {
  //     await api.put(`/user/${user.id}/coProducer/${id}`, {
  //       accepted: true,
  //       acceptedAt: new Date(),
  //     })
  //     addToast({
  //       type: 'success',
  //       title: 'Pedido de co-produção aceito!',
  //     })
  //     resetNotifications()
  //   } catch (e) {
  //     addToast({
  //       type: 'error',
  //       title: 'Algo de errado aconteceu :(',
  //     })
  //   }
  // }

  // async function denyInvite() {
  //   try {
  //     await api.delete(`/user/${user.id}/coProducer/${id}`)
  //     addToast({
  //       type: 'success',
  //       title: 'Pedido de co-produção negado com sucesso.',
  //     })
  //     resetNotifications()
  //   } catch (e: any) {
  //     console.error(e.toString())
  //     addToast({
  //       type: 'error',
  //       title: 'Algo de errado aconteceu.',
  //     })
  //   }
  // }

  return (
    <Container>
      <MainContent>
        <span className="dotgreen"></span>
        <span>
          <b>{producerName}</b> lhe enviou uma solicitação de co-produção para o
          produto {productName}
        </span>
      </MainContent>

      <Buttons>
        {/* <button onClick={approveInvite}>Aceitar</button>
        <button onClick={denyInvite}>Recusar</button> */}
      </Buttons>
    </Container>
  )
}

export default NotificationCoProduction
