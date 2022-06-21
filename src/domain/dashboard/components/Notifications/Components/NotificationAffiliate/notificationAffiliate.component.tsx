import React, { useEffect, useState } from 'react'

import { Container, Buttons, MainContent } from './notificationAffiliate.styles'

// import api from 'services/api'
// import { useAuth } from 'hooks/useAuth'
// import { useToast } from 'hooks/Toast'

function NotificationAffiliate({
  affiliation_id,
  product_id,
  affiliate_id,
  setNotifications,
  notifications,
}: any) {
  const [productName, setProductName] = useState('')
  const [affiliateName, setAffiliateName] = useState('')

  // const { user } = useAuth()
  // const { addToast } = useToast()

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await api.get(`products/${product_id}`)
  //     setProductName(data.data.product.title)
  //     const affiliate = await api.get(`user/name/${affiliate_id}`)
  //     setAffiliateName(affiliate.data.data.name)
  //   }
  //   fetchData()
  // }, [])

  // async function approveAffiliate() {
  //   try {
  //     await api.post(`/users/${user.id}/affiliates/${affiliation_id}/approve`, {
  //       comission: '20',
  //       type_comission: 'PERCENTAGE',
  //     })
  //     addToast({
  //       type: 'success',
  //       title: 'Pedido de afiliado aprovado!',
  //     })
  //     const newNotifications = notifications.filter(
  //       (item: { affiliate_id: any; product_id: any }) =>
  //         item.affiliate_id !== affiliate_id && item.product_id !== product_id,
  //     )
  //     setNotifications(newNotifications)
  //   } catch {
  //     addToast({
  //       type: 'error',
  //       title: 'Algo de errado aconteceu :(',
  //     })
  //   }
  // }

  // async function denyAffiliate() {
  //   try {
  //     await api.post(`/users/${user.id}/affiliates/${affiliation_id}/denny`)
  //     addToast({
  //       type: 'success',
  //       title: 'Pedido de afiliado negado!',
  //     })
  //     const newNotifications = notifications.filter(
  //       (item: { affiliate_id: any; product_id: any }) =>
  //         item.affiliate_id !== affiliate_id && item.product_id !== product_id,
  //     )
  //     setNotifications(newNotifications)
  //   } catch {
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
          <b>{affiliateName}</b> pediu para se afiliar no {productName}
        </span>
      </MainContent>

      <Buttons>
        {/* <button onClick={approveAffiliate}>Aceitar</button>
        <button onClick={denyAffiliate}>Recusar</button> */}
      </Buttons>
    </Container>
  )
}

export default NotificationAffiliate
