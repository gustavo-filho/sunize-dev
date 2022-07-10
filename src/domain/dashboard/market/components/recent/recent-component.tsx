import React, { useEffect, useState } from 'react'
import { Pagination } from '@domain/dashboard/components/pagination/pagination.component'
import { Container, Filter, InputSearch, PaginationContainer, Search, SearchAndResults, SearchResults } from './recent-styles'
import { MarketProduct } from '../market-product/market-product-component'
import { Product } from '@shared/types/types'
import { Loupe } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { useFetch } from '../../config/useFetch.config'

export function Recent(): JSX.Element {
    const [offset, setOffset] = useState(0)
    const [totalPages] = useState(0)
    const { data, error } = useFetch(`products/recent`)
    const [productsRecent, setProductsRecent] = useState<Product[]>([])
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [search, setSearch] = useState('')

    function handleChange(event: {
        target: { value: React.SetStateAction<string> }
    }) {
        setSearch(event.target.value)
    }

    useEffect(() => {
        if (data) {
            setProductsRecent(data.data as Product[])
        }
    }, [data, offset])

    useEffect(() => {
        if (productsRecent) {
            if (search.length === 0) {
                setSearchResults([])
            }
            if (search.length > 0) {
                const results = productsRecent.filter((product) =>
                    product.title.toLowerCase().includes(search.toLocaleLowerCase()),
                )
                setSearchResults(results)
            }
        }
    }, [productsRecent, search])

    return (
        <Container>
            <h2>Mercado de Produtos Recentes</h2>
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
            
            {productsRecent ? (
                productsRecent.map((product, index) => (
                    <MarketProduct key={index} product={product} />
                ))
            ) : !productsRecent ? (
                <p>Buscando produtos em recentes...</p>
            ) : (
                error && <p>Erro ao buscar produtos em recentes</p>
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
        </Container>
    )
}