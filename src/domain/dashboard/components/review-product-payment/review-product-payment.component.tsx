import React, { useEffect, useCallback, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import {
    Container,
    ProductImage,
    Description,
    DotsLoaderContainer,
} from './review-product-payment.styles'
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component'
import { DotsLoader } from '@shared/components/DotsLoader/dots-loader.component'
import { InstallmentTypes } from './interfaces/installment-types'

export function ReviewProduct(): JSX.Element {
    const { product, installments, productPriceModified, voucherApplied } =
        usePayment()
    const [lastInstallment, setLastInstallment] = useState<InstallmentTypes>(
        {} as InstallmentTypes,
    )

    useEffect(() => {
        setLastInstallment(installments[installments.length - 1])
    }, [installments])

    const totalPriceFormated = useCallback(() => {
        if (productPriceModified) {
            return productPriceModified.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
            })
        }
    }, [productPriceModified])

    const lastInstallmentValueFormated = useCallback(() => {
        if (lastInstallment && lastInstallment.InstallmentValue) {
            const lastInstallmentValueConverted =
                lastInstallment.InstallmentValue.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })

            return lastInstallmentValueConverted
        }
    }, [lastInstallment])

    return (
        <>
            {!lastInstallment ? (
                <DotsLoaderContainer>
                    <DotsLoader />
                </DotsLoaderContainer>
            ) : (
                <Container>
                    <ProductImage>
                        {product.image ? (
                            <img src={product.image} alt={product.title} />
                        ) : (
                            <FaImage />
                        )}
                    </ProductImage>
                    <Description>
                        <strong>{product.title}</strong>
                        <span>{lastInstallment.Installments}x de:</span>
                        <span>
                            <b>CUPOM:</b> {voucherApplied || 'SEM CUPOM'}
                        </span>
                        <h2>{lastInstallmentValueFormated()}</h2>
                        <small>ou à vista: {totalPriceFormated()}</small>
                    </Description>
                </Container>
            )}
        </>
    )
}
