import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useAppDispatch } from '@store/hooks';

import Pagination from '@components/Pagination';
import BasketList from '@components/BasketList';
import ProductsList from '@components/ProductsList';
import Filters from '@components/Filters';
import Pages from '@components/Pages';

import * as reducers from '@store/basketReducer';

import './Basket.module.scss';

import prods from './products.json';

const Basket = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(reducers.setProducts(prods));
        dispatch(reducers.setCountProducts(prods.length));
    }, [dispatch]);

    return (
        <Container className='page'>
            <Row className='products'>
                <Col xs={8} className='products__block'>
                    <Filters />
                    <ProductsList />
                    <div className='products__pagination'>
                        <ul className='products__pagination-list'>
                            <Pagination />
                        </ul>
                        <Pages />
                    </div>
                </Col>
                <Col xs={4} className='products__basket'>
                    <BasketList />
                </Col>
            </Row>
        </Container>
    );
};

export default Basket;
