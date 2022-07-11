import React, { useEffect, useState, useCallback } from 'react'
import { PaginationContainer, Container } from './courses.style'
import { DropdownFilter } from '../dropdown-filter/dropdown-filter.component'
import { api } from '@shared/services/api'
import { useAppSelector } from '../../../../../store/hooks'
import { userSelector } from '@domain/auth/user/user.store'
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component'
import { MarketProduct } from '../market-product/market-product-component'
import { useFetch } from '../../config/useFetch.config'
import { ICategory } from '../../interfaces/iCategory.types'

export function Courses(): JSX.Element {
    const user = useAppSelector(userSelector);
    const [offset, setOffset] = useState(0)
    const [totalPages] = useState(0)
    const { data, error } = useFetch(
        `/marketplace/${user.data.id}/?product_type=ONLINE_COURSE`,
        {
            headers: { 'sunize-access-token': user.data.access_token },
        },
    )
    const [courses, setCourses] = useState([])
    const [productsSorted, setProductsSorted] = useState([])
    const [reverseSorted, setReverseSorted] = useState([])
    const [selectedOrder, setSelectedOrder] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('')
    const [productsCategory, setProductsCategory] = useState([])
    const [categories, setCategories] = useState([] as ICategory[])

    function sortFunction(a: any, b: any) {
        if (a.price < b.price) {
            return -1
        } else {
            return true
        }
    }

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCategories = useCallback(async () => {
        const response = await api.get('categories', {
            headers: { 'sunize-access-token': user.data.access_token },
        })
        setCategories(response.data.data)
    }, [user.data.access_token])

    useEffect(() => {
        if (data) {
            const filteredProducts = data.data.filter(
                (product: { product_type: string }) =>
                    product.product_type === 'ONLINE_COURSE',
            )
            setCourses(filteredProducts)
            setProductsSorted(filteredProducts.sort(sortFunction))
            const reverseArray = filteredProducts.slice(0)
            setReverseSorted(reverseArray.sort(sortFunction).reverse())
        }
    }, [data, offset])

    useEffect(() => {
        if (selectedFilter) {
            if (
                courses.filter(
                    (product: any) => product.categories[0]?.title === selectedFilter,
                ).length > 0
            ) {
                setProductsCategory(
                    courses.filter(
                        (product: any) => product.categories[0]?.title === selectedFilter,
                    ),
                )
                setSelectedOrder('filter')
            } else {
                setSelectedOrder('noItem')
                setProductsCategory([])
            }
        }
    }, [selectedFilter, data, courses])

    return (
        <>
            {courses ? (
                <Container>
                    <DropdownFilter
                        setSelectedOrder={setSelectedOrder}
                        setSelectedFilter={setSelectedFilter}
                        categories={categories && categories}
                    />

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {productsCategory.length > 0
                            ? selectedOrder === ''
                                ? productsCategory.map((product, index) => (
                                    <MarketProduct key={index} product={product} />
                                ))
                                : selectedOrder === 'topToBottom'
                                    ? reverseSorted.map(
                                        (product: any, index) =>
                                            product.categories === selectedFilter && (
                                                <MarketProduct key={index} product={product} />
                                            ),
                                    )
                                    : selectedOrder === 'bottomToTop'
                                        ? productsSorted.map(
                                            (product: any, index) =>
                                                product.categories === selectedFilter && (
                                                    <MarketProduct key={index} product={product} />
                                                ),
                                        )
                                        : selectedOrder === 'noItem' && (
                                            <p>
                                                Infelizmente não encontramos produtos com essa categoria
                                            </p>
                                        )
                            : selectedOrder === ''
                                ? courses.map((product, index) => (
                                    <MarketProduct key={index} product={product} />
                                ))
                                : selectedOrder === 'topToBottom'
                                    ? reverseSorted.map((product, index) => (
                                        <MarketProduct key={index} product={product} />
                                    ))
                                    : selectedOrder === 'bottomToTop' &&
                                    productsSorted.map((product, index) => (
                                        <MarketProduct key={index} product={product} />
                                    ))}
                    </div>
                </Container>
            ) : !courses ? (
                <p>Buscando cursos...</p>
            ) : (
                error && <p>Erro ao buscar cursos</p>
            )}

            {totalPages > 1 && (
                <PaginationContainer>
                    <Pagination
                        totalPages={totalPages}
                        offset={offset}
                        setOffset={setOffset}
                    />
                </PaginationContainer>
            )}
        </>
    )
}