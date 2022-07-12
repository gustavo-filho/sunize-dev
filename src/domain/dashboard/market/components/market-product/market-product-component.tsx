import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaImage, FaTimes } from 'react-icons/fa'
import {
    EmptyImage,
    Modal,
    ContentModal,
    Overlay,
    Divisor,
    CloseButton,
    DepositionsContainer,
} from './market-product-styles'
import { Evaluation } from './evaluation/evaluation.component'
import { Deposition } from './deposition/deposition.component'
import ReactPixel from 'react-facebook-pixel'
import { api } from '@shared/services/api'
import { useAppSelector } from '../../../../../store/hooks'
import { userSelector } from '@domain/auth/user/user.store'
import { toast } from 'react-toastify'
import { IMarketProductProps } from '../../interfaces/imarket-product-props.type'

export const MarketProduct: React.FC<IMarketProductProps> = ({ product }) => {
    const user = useAppSelector(userSelector);
    const [modal, setModal] = useState(false)
    const [avaliations, setAvaliations] = useState([]) as any
    const [hasAffiliate, setHasAffiliate] = useState(false)

    useEffect(() => {
        async function getAvaliations() {
            const { data } = await api.get(`/avaliations/${product.id}`)
            setAvaliations(data.data)
        }
        getAvaliations()
        api
            .get(`/user/${user.data.id}/${product.id}/pixel/show`)
            .then((res) => {
                res.data.message.forEach((v: any, k: number) => {
                    switch (v.type) {
                        case 'facebook':
                            ReactPixel.trackSingle(v.content, 'pageView')
                            break
                    }
                })
            })
            .catch(console.error)

        api.get(`/products/${product.id}`).then(({ data }) => {
            setHasAffiliate(data.data.product.system_affiliate)
        })
    }, [product.id, user.data.id])

    const priceConverted = useMemo(() => {
        if (product.price) {
            return product.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
            })
        }
    }, [product.price])

    const commissionConverted = useMemo(() => {
        if (!hasAffiliate) return false

        if (product.commission && product.commission !== 0) {
            const commissionProduct = product.price * (product.commission / 100)

            const commissionProductConverted = commissionProduct.toLocaleString(
                'pt-br',
                {
                    style: 'currency',
                    currency: 'BRL',
                },
            )

            return commissionProductConverted
        }

        return false
    }, [product.commission, product.price, hasAffiliate])

    const requestAffiliation = useCallback(async () => {
        try {
            await api.post(
                `users/${user.data.id}/affiliates/${product.id}`,
                {
                    producerID: product.owner_id,
                },
                { headers: { 'sunize-access-token': user.data.access_token } },
            )
            toast.success('Solicitação de afiliação enviada!')
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.owner_id, user.data.access_token, user.data.id])

    return (
        <>
            <div style={{
                width: '300px', height: '360px', backgroundColor: '#27293d', margin: '15px 30px 5.5rem 0px',
                cursor: 'pointer',transition: 'box-shadow 0.2s', boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)'

            }} onClick={() => setModal(!modal)}>
                {product.image ? (
                    <img style={{ width: '300px', height: '200px', marginBottom: '20px' }} src={product.image} alt={product.title} />
                ) : (
                    <div >
                        <FaImage style={{ width: '70px', height: '200px', marginBottom: '20px', marginLeft: '110px', color: '#4b4b4b' }} />
                    </div>
                )}

                <div style={{ textAlign: 'center', color: '#ccc' }}>
                    <strong>{product.title}</strong>
                </div>
                <div style={{ marginTop: '20px', marginLeft: '5px', color: '#ccc' }}>
                    <Evaluation productId={product.id} />
                    <p>{priceConverted}</p>
                    <div style={{ marginTop: '20px', color: 'rgba(220, 152, 75, 1)' }}>
                        <span>
                            {hasAffiliate
                                ? `Receba até ${commissionConverted} por venda`
                                : 'Produto sem comissão'}
                        </span>
                    </div>
                </div>
            </div>

            <Modal modal={Number(modal)}>
                <ContentModal>
                    <CloseButton>
                        <FaTimes onClick={() => setModal(!modal)} />
                    </CloseButton>

                    <h1>{product.title}</h1>
                    <h4>
                        Por <b>{product.User.name}</b>
                    </h4>

                    <main>
                        {product.image ? (
                            <img src={product.image} alt={product.title} />
                        ) : (
                            <EmptyImage>
                                <FaImage />
                            </EmptyImage>
                        )}

                        <div>
                            {!product.sale_disabled ? (
                                <>
                                    <p>Adquira este produto por {priceConverted}</p>
                                    <Link to={`/payment/${product.id}`}>Adquirir aqui</Link>
                                </>
                            ) : (
                                <p>Este produto não está disponível no momento.</p>
                            )}

                            {hasAffiliate && (
                                <>
                                    <strong>
                                        Seja afiliado e receba até
                                        <br />
                                        <b>{commissionConverted} por cada venda</b>
                                    </strong>
                                    <button type="button" onClick={requestAffiliation}>
                                        Solicitar afiliação
                                    </button>
                                </>
                            )}
                        </div>
                    </main>

                    <Divisor>
                        <h1>Sobre o Curso</h1>
                        <p className="description">{product.description}</p>
                    </Divisor>

                    <Divisor>
                        <h1>Avaliações</h1>
                    </Divisor>

                    <DepositionsContainer>
                        {avaliations.length > 0
                            ? avaliations.map((avaliation: any) => (
                                <Deposition avaliation={avaliation} key={avaliation.id} />
                            ))
                            : 'Este produto ainda não tem avaliações.'}
                    </DepositionsContainer>
                </ContentModal>
                <Overlay onClick={() => setModal(!modal)}></Overlay>
            </Modal>
        </>
    )
}
