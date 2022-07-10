import React, { useEffect, useState, useCallback } from 'react'
import { DropdownFilter } from '../dropdown-filter/dropdown-filter.component'
import { Container, Filter, InputSearch, PaginationContainer, Search, SearchAndResults, SearchResults } from '../recent/recent-styles'
import { userSelector } from '@domain/auth/user/user.store'
import { useAppSelector } from '../../../../../store/hooks'
import { api } from '@shared/services/api'
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component'
import { MarketProduct } from '../market-product/market-product-component'
import { Product } from '@shared/types/types'
import { Loupe } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../../config/useFetch.config'
import { ICategory } from '../../interfaces/iCategory.types'

export function EBooks(): JSX.Element {
    const user = useAppSelector(userSelector);
    const [offset, setOffset] = useState(0)
    const [totalPages] = useState(0)
    const { data, error } = useFetch(
        `/marketplace/${user.data.id}/?product_type=EBOOK`,
        {
            headers: { 'sunize-access-token': user.data.access_token },
        },
    )
    const [eBooks, setEBooks] = useState([])
    const [productsSorted, setProductsSorted] = useState([])
    const [reverseSorted, setReverseSorted] = useState([])
    const [selectedOrder, setSelectedOrder] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('')
    const [productsCategory, setProductsCategory] = useState([])
    const [categories, setCategories] = useState([] as ICategory[])
    const [allProducts, setAllProducts] = useState<Product[]>()
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleChange(event: {
        target: { value: React.SetStateAction<string> }
    }) {
        setSearch(event.target.value)
    }

    useEffect(() => {
        if (data) {
            setAllProducts(data.data as Product[])
        }
    }, [data])

    useEffect(() => {
        if (allProducts) {
            if (search.length === 0) {
                setSearchResults([])
            }
            if (search.length > 0) {
                const results = allProducts.filter((product) =>
                    product.title.toLowerCase().includes(search.toLocaleLowerCase()),
                )
                setSearchResults(results)
            }
        }
    }, [allProducts, search])

    const getCategories = useCallback(async () => {
        const response = await api.get('categories', {
            headers: { 'sunize-access-token': user.data.access_token },
        })
        setCategories(response.data.data)
    }, [user.data.access_token])

    function sortFunction(a: any, b: any) {
        if (a.price < b.price) {
            return -1
        } else {
            return true
        }
    }

    useEffect(() => {
        if (data) {
            const filteredProducts = data.data.filter(
                (product: { product_type: string }) => product.product_type === 'EBOOK',
            )
            setEBooks(filteredProducts)
            setProductsSorted(filteredProducts.sort(sortFunction))
            const reverseArray = filteredProducts.slice(0)
            setReverseSorted(reverseArray.sort(sortFunction).reverse())
        }
    }, [data, offset])

    useEffect(() => {
        if (selectedFilter) {
            if (
                eBooks.filter(
                    (product: any) => product.product_categories === selectedFilter,
                ).length > 0
            ) {
                setProductsCategory(
                    eBooks.filter(
                        (product: any) => product.product_categories === selectedFilter,
                    ),
                )
                setSelectedOrder('filter')
            } else {
                setSelectedOrder('noItem')
                setProductsCategory([])
            }
        }
    }, [selectedFilter, data, eBooks])

    return (
        <>
            {eBooks ? (
                <Container>

                    <h2>Mercado de Produtos</h2>
                    <p>Afilie-se a um produto e comece a ter ganhos hoje mesmo!</p>

                    <SearchAndResults>
                        <InputSearch>
                            <input
                                type="text"
                                placeholder="Pesquise pelo nome do produto ou nome do produtor"
                                value={search}
                                onChange={handleChange}
                            />
                            <Search>
                                <Loupe />
                            </Search>
                        </InputSearch>
                        <SearchResults>
                            {searchResults &&
                                searchResults.map((product) => (
                                    <div key={product.id}>
                                        <a href={`/payment/${product.id}`}>{product.title}</a>
                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                        <img src={product.image}></img>
                                    </div>
                                ))}
                        </SearchResults>
                    </SearchAndResults>

                    <Filter>
                        <ul>
                            <li>
                                <NavLink to="/dashboard/mercado/ebooks" activeClassName="active">
                                    <b>e-Books</b>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mercado/cursos" activeClassName="active">
                                    <b>Cursos</b>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/mercado/assinaturas"
                                    activeClassName="active"
                                >
                                    <b>Assinaturas</b>
                                </NavLink>
                            </li>
                        </ul>
                    </Filter>

                    <DropdownFilter
                        setSelectedOrder={setSelectedOrder}
                        setSelectedFilter={setSelectedFilter}
                        categories={categories && categories}
                    />

                    <div>
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
                                ? eBooks.map((product, index) => (
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
            ) : !eBooks ? (
                <p>Buscando eBooks...</p>
            ) : (
                error && <p>Erro ao buscar eBooks</p>
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