import React, { useEffect, useState } from 'react'

import { Container, Content } from './deposition.styles'

// import imgTop from 'Assets/Dashboard/marketTest/courseTest.png'
import { Evaluation } from '../evaluation/evaluation.component'
import { api } from '@shared/services/api'


interface IAvaliation {
    avaliation: {
        description: string
        clientId: string
    }
}

export function Deposition({ avaliation }: IAvaliation): JSX.Element {
    const [client, setClient] = useState({} as any)

    useEffect(() => {
        async function getUserData() {
            const { data } = await api.get(`/users/${avaliation.clientId}`)
            setClient(data.data)
        }
        getUserData()
    }, [])

    return (
        <Container>
            {/* <img src={client ? imgTop : client.photo} alt={client?.name} /> */}

            <Content>
                <header>
                    <strong>{client?.name}</strong>
                    <Evaluation productId={1} withoutNumber />
                </header>

                <p>{avaliation.description}</p>
            </Content>
        </Container>
    )
}