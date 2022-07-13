import { userSelector } from '@domain/auth/user/user.store'
import { api } from '@shared/services/api'
import { addHours } from 'date-fns'
import Cookies from 'js-cookie'
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../../store/hooks'


interface UserData {
    name: string
    email: string
    phone: string
}
interface ProductData {
    title: string
    description: string
    price: number
    image: string
    sale_disabled: boolean
    User: UserData
}

interface Installment {
    Installments: number
    InstallmentValue: number
}

interface ApplyVoucherProps {
    voucher: string
    productId: string
}

interface PaymentData {
    name: string
    email: string
    cpf: string
    cnpj: string
    stepPayment: number
    product: ProductData
    productPriceModified: number
    installments: Installment[]
    voucherApplied: string
    registerName(name: string): void
    registerEmail(email: string): void
    registerCpf(cpf: string): void
    registerCnpj(cnpj: string): void
    setStepPayment: Dispatch<SetStateAction<number>>
    registerProduct(product: Record<string, unknown>): void
    clearDataCheckout(): void
    getInstallments(price: number): Promise<Installment[] | boolean>
    registerInstallments(installmetns: Installment[]): void
    applyVoucher(props: ApplyVoucherProps): void
    setProductPriceModified(newPrice: number): void
    removeVoucher(): void
}

const Payment = createContext<PaymentData>({} as PaymentData)

export function PaymentProvider({ children }: any): JSX.Element {
    const user = useAppSelector(userSelector);
    const [name, setName] = useState(Cookies.get('@payment_name') ?? '')
    const [email, setEmail] = useState(Cookies.get('@payment_email') ?? '')
    const [cpf, setCpf] = useState(Cookies.get('@payment_cpf') ?? '')
    const [cnpj, setCnpj] = useState(Cookies.get('@payment_cnpj') ?? '')
    const [stepPayment, setStepPayment] = useState(0)

    const [product, setProduct] = useState({} as ProductData)
    const [productPriceModified, setProductPriceModified] = useState(0)
    const [installments, setInstallments] = useState<Installment[]>([])
    const [voucherApplied, setVoucherApplied] = useState('')

    useEffect(() => {
        if (product.price) {
            setProductPriceModified(product.price)
        }
    }, [product.price])

    const registerProduct = useCallback((product: any) => {
        if (product) setProduct(product)
    }, [])

    const registerName = useCallback((name: string) => {
        setName(name)
        Cookies.set('@payment_name', name, {
            expires: addHours(new Date(), 1),
        })
    }, [])

    const registerEmail = useCallback((email: string) => {
        setEmail(email)
        Cookies.set('@payment_email', email, {
            expires: addHours(new Date(), 1),
        })
    }, [])

    const registerCpf = useCallback((cpf: string) => {
        setCpf(cpf)
        Cookies.set('@payment_cpf', cpf, {
            expires: addHours(new Date(), 1),
        })
    }, [])

    const registerCnpj = useCallback((cnpj: string) => {
        setCnpj(cnpj)
        Cookies.set('@payment_cnpj', cnpj, {
            expires: addHours(new Date(), 1),
        })
    }, [])

    const clearDataCheckout = useCallback(() => {
        Cookies.remove('@payment_name')
        Cookies.remove('@payment_email')
        Cookies.remove('@payment_cpf')
        Cookies.remove('@payment_cnpj')
    }, [])

    const getInstallments = useCallback(
        async (price: number) => {
            try {
                const { data } = await api.post('installments', {
                    amount: price,
                })

                return data.installments as Installment[]
            } catch (e: any) {
                console.error(e)
                toast.error(`Busca incompleta: ${e.response?.data?.message}`)
                return false
            }
        },
        [],
    )

    const registerInstallments = useCallback((installments: Installment[]) => {
        setInstallments(installments)
    }, [])

    const applyVoucher = useCallback(
        ({ voucher, productId }: any) => {
            if (!voucher) {
                toast.error('Preencha o cupom corretamente')
                return
            } else if (voucher === voucherApplied) {
                toast.info('Este cupom já foi aplicado')
                return
            }

            api
                .post(
                    `products/${productId}/vouchers`,
                    { voucherCode: voucher },
                    {
                        headers: {
                            'sunize-access-token': user?.data.access_token
                                ? user?.data.access_token
                                : '',
                        },
                    },
                )
                .then(({ data }) => {
                    const discountPercentage = data.data.discount_percentage
                    const newProductPrice =
                        product.price - product.price * (discountPercentage / 100)

                    setProductPriceModified(newProductPrice)

                    setVoucherApplied(voucher)
                    // Cookies.set('@payment_voucher', voucher)
                    toast.success('Cupom aplicado na compra')
                })
                .catch((err: any) => {
                    if (Cookies.get('@payment_voucher') === voucher) {
                        Cookies.remove('@payment_voucher')
                    }
                    toast.error(`${err.response.data.message}`)
                })
        },
        [product, user?.data.access_token, voucherApplied],
    )

    const removeVoucher = useCallback(() => {
        setVoucherApplied('')
        setProductPriceModified(product.price)
        // Cookies.remove('@payment_voucher')
    }, [product])

    return (
        <Payment.Provider
            value={{
                name,
                email,
                cpf,
                cnpj,
                stepPayment,
                product,
                productPriceModified,
                installments,
                voucherApplied,
                registerName,
                registerEmail,
                registerCpf,
                registerCnpj,
                setStepPayment,
                registerProduct,
                clearDataCheckout,
                getInstallments,
                registerInstallments,
                applyVoucher,
                setProductPriceModified,
                removeVoucher,
            }}
        >
            {children}
        </Payment.Provider>
    )
}

export function usePayment() {
    const context = useContext(Payment)

    return context
}
