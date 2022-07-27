import React, { useEffect, useState } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Recent } from './components/recent/recent-component'
import { EBooks } from './components/ebook/ebook.component';
import { Courses } from './components/courses/courses.component'
import { Subscriptions } from './components/subscriptions/subscriptions.component'
import { TopCommissions } from './components/top-commissions/top-commissions.component';
import {
    Container,
    InputSearch,
    Search,
    Filter,
    ProductWrapper,
    SearchAndResults,
    SearchResults,
} from './market-page-styles'
import { CopyrightFooter } from '../components/copyright-footer/copyright-footer.component'
import { Product } from '@shared/types/types'
import { Loupe } from '@mui/icons-material'
import { useFetch } from './config/useFetch.config';

export function Market(): JSX.Element {
    const { data } = useFetch(`products/recent`)
    const [allProducts, setAllProducts] = useState<Product[]>()
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [search, setSearch] = useState('')

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

    return (
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
                    {/*<li>
                        <NavLink to="/dashboard/mercado/ebooks" activeClassName="active">
                            <b>e-Books</b>
                        </NavLink>
                        </li>*/}
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
                    <li>
                        <NavLink
                            to="/dashboard/mercado/top-comissoes"
                            activeClassName="active"
                        >
                            <b>Top Comissões</b>
                        </NavLink>
                    </li>
                </ul>
            </Filter>
            <ProductWrapper>
                <Switch>
                    <Route path="/dashboard/mercado" exact component={Courses} />
                    <Route path="/dashboard/mercado/cursos" component={Courses} />
                    <Route path="/dashboard/mercado/recentes" component={Recent} />
                    <Route path="/dashboard/mercado/assinaturas" component={Subscriptions} />
                    <Route path="/dashboard/mercado/ebooks" component={EBooks} />
                    <Route path="/dashboard/mercado/top-comissoes" component={TopCommissions} />
                </Switch>
            </ProductWrapper>
            <CopyrightFooter limitWidth={1030} />
        </Container>
    )
}