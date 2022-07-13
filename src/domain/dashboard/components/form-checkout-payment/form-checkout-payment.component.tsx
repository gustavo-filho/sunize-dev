import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    FaBarcode,
    FaCheck,
    FaCreditCard,
    FaMoneyCheckAlt,
    FaRegCreditCard,
} from 'react-icons/fa'
import { Container, Method, CheckIcon } from './form-checkout-payment.styles'
import { useFetch } from '@domain/dashboard/market/config/useFetch.config'
import { usePayment } from '@domain/dashboard/paymet/utils/usePaymet.component'
import { CustomCheckoutData } from '@shared/types/types'
import { ReviewProduct } from '../review-product-payment/review-product-payment.component'
import { BankSlip } from '../form-personal-data-payment/methods/bank-slip/bank-slip.component'
import { CreditCard } from '../form-personal-data-payment/methods/credit-card/credit-card.component'
import { DebitCard } from '../form-personal-data-payment/methods/debit-card/debit-card.component'
import { Pix } from '../form-personal-data-payment/methods/pix/pix.component'

export function FormCheckout(): JSX.Element {
    const { setStepPayment, name } = usePayment()
    const history = useHistory()
    const { productId } = useParams<{ productId: string }>()
    const { data } = useFetch(`/checkout/${productId}`)
    const [customCheckout, setCustomCheckout] = useState<CustomCheckoutData>()
    const [methodActive, setMethodActive] = useState('creditCard')

    useEffect(() => {
        if (data) {
            setCustomCheckout(data.data)
        }
    }, [data])

    useEffect(() => {
        !name && history.replace(`/payment/${productId}`)
        setStepPayment(2)
    }, [history, name, productId, setStepPayment])

    return (
        <Container>
            <ReviewProduct />
            <h1>Pagamento</h1>
            <header>
                {customCheckout && customCheckout.options_pay.includes('boleto') && (
                    <Method
                        name="bankslip"
                        methodActive={methodActive}
                        onClick={() => setMethodActive('bankslip')}
                    >
                        <FaBarcode />
                        <span> Boleto bancário</span>

                        {methodActive === 'bankslip' && (
                            <CheckIcon>
                                <FaCheck />
                            </CheckIcon>
                        )}
                    </Method>
                )}

                {customCheckout && customCheckout.options_pay.includes('credit') && (
                    <Method
                        name="creditCard"
                        methodActive={methodActive}
                        onClick={() => setMethodActive('creditCard')}
                    >
                        <FaCreditCard />
                        <span> Cartão de Crédito</span>

                        {methodActive === 'creditCard' && (
                            <CheckIcon>
                                <FaCheck />
                            </CheckIcon>
                        )}
                    </Method>
                )}

                {customCheckout && customCheckout.options_pay.includes('debit') && (
                    <Method
                        name="debitCard"
                        methodActive={methodActive}
                        onClick={() => setMethodActive('debitCard')}
                    >
                        <FaRegCreditCard />
                        <span> Cartão de Débito</span>

                        {methodActive === 'debitCard' && (
                            <CheckIcon>
                                <FaCheck />
                            </CheckIcon>
                        )}
                    </Method>
                )}

                {customCheckout && customCheckout.options_pay.includes('pix') && (
                    <Method
                        name="pix"
                        methodActive={methodActive}
                        onClick={() => setMethodActive('pix')}
                    >
                        <FaMoneyCheckAlt />
                        <span>PIX</span>

                        {methodActive === 'pix' && (
                            <CheckIcon>
                                <FaCheck />
                            </CheckIcon>
                        )}
                    </Method>
                )}
            </header>

            <main>
                {methodActive === 'creditCard' && <CreditCard />}
                {methodActive === 'debitCard' && <DebitCard />}
                {methodActive === 'pix' && <Pix />}
                {methodActive === 'bankslip' && <BankSlip />}
            </main>
        </Container>
    )
}