import React, { useCallback, useEffect, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import {
    Container,
    Content,
    Description,
    DotsLoaderContainer,
    ProductImage,
    FooterDescription,
} from './upsell-payment-styles'
import { api } from '@shared/services/api'
import { Product } from '@shared/types/types'
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component'
import { UpsellProps } from './interfaces/iupsell-props-type'

export function Upsell({ toggle, state, productIds }: UpsellProps) {
    const [upsellProduct, setUpsellProduct] = useState<Product[]>([])
    const getProducts = useCallback(async (productsIds: any) => {
        const products = []
        for (const productId of productsIds) {
            const product = await api.get(`products/${productId}`)
            console.log(product)
            products.push(product.data.data.product)
        }
        console.log(products)
        setUpsellProduct(products)
    }, [])

    useEffect(() => {
        if (productIds && productIds?.length > 0) {
            getProducts(productIds)
        }
    }, [getProducts, productIds])

    return (
        <>
            <h1>Aproveite e compre junto</h1>
            {!upsellProduct ? (
                <DotsLoaderContainer>
                    <DotsLoader />
                </DotsLoaderContainer>
            ) : (
                <>
                    {upsellProduct.map((product) => (
                        <Content key={product.id} state={state}>
                            <Container>
                                <ProductImage>
                                    {product.image ? (
                                        <img src={product.image} alt={product.title} />
                                    ) : (
                                        <FaImage />
                                    )}
                                </ProductImage>
                                <Description>
                                    <div>
                                        <strong>{product.title}</strong>
                                        <p>{product.description}</p>
                                    </div>
                                    <FooterDescription state={state}>
                                        <div>
                                            <small>
                                                de:
                                                {product.price.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })}
                                            </small>
                                            <h2>
                                                Por:{' '}
                                                {product.price.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })}
                                            </h2>
                                        </div>

                                        <button type="button" onClick={toggle}>
                                            {state ? (
                                                <span>REMOVER OFERTA</span>
                                            ) : (
                                                <span>ADICIONAR OFERTA</span>
                                            )}
                                        </button>
                                    </FooterDescription>
                                </Description>
                            </Container>
                        </Content>
                    ))}
                </>
            )}
        </>
    )
}