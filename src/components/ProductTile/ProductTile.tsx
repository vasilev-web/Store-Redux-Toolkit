import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import FormaterPrice from '@helpers/FormaterPrice';

import './ProductTile.module.scss';
import { Button } from 'react-bootstrap';
import { useAppDispatch, useShallowEqualSelector } from '@store/hooks';

import * as reducers from '@store/basketReducer';
import {
    ADDED,
    ADD_TO_BASKET,
    BALANCE,
    GOODS,
    PRODUCT_IS_OVER,
    PRODUCT_OUT_STOCK
} from '@components/Basket/Basket.locale';
import { ProductsProps } from '@store/types';

const ProductTile = ({ product }) => {
    const dispatch = useAppDispatch();

    const productBasket = useShallowEqualSelector(
        (state) => state.basket.basket
    ) as ProductsProps[];

    const productInBasket = useMemo(
        () => productBasket.filter((prod) => prod.id === product.id),
        [productBasket, product]
    );

    const getRestProduct = useCallback(() => {
        return product.count - (productInBasket.length ? productInBasket[0].count : 0);
    }, [product, productInBasket]);

    const handlerButton = useCallback(
        (id: number) => {
            dispatch(reducers.setBasketProducts(id));
            dispatch(reducers.setSumma(id));
        },
        [dispatch]
    );

    return (
        <div
            id={`product_${product.id}`}
            className={clsx('products__item', !getRestProduct() && 'products__item--notavailable')}
        >
            <div className='products__item-image'>
                <img src={product.image} alt='' />
            </div>
            <div className='products__item-body'>
                <div className='products__item-title'>{product.title}</div>
                <div className='products__item-price'>{FormaterPrice(product.price)}</div>
                <div className='products__item-description'>{product.descr}</div>
            </div>
            <>
                <div className='products__item-action'>
                    {product.available ? (
                        <>
                            {getRestProduct() ? (
                                <>
                                    <Button
                                        className='products__item-button'
                                        onClick={() => handlerButton(product.id)}
                                    >
                                        {ADD_TO_BASKET}
                                    </Button>
                                    <div className='products__item-cart'>
                                        {BALANCE}:{' '}
                                        <span className='products__item-cart-count'>
                                            {getRestProduct()} {GOODS}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className='products__item-action-notavailable'>
                                    {PRODUCT_IS_OVER}
                                </div>
                            )}
                            {productInBasket.length ? (
                                <div className='products__item-cart products__item-cart--added'>
                                    {ADDED}:{' '}
                                    <span className='products__item-cart-count'>
                                        {productInBasket[0].count} {GOODS}
                                    </span>
                                </div>
                            ) : (
                                ''
                            )}
                        </>
                    ) : (
                        <div className='products__item-action-notstock'>{PRODUCT_OUT_STOCK}</div>
                    )}
                </div>
            </>
        </div>
    );
};

const ProductTileMemorizated = React.memo(ProductTile, (props, nextProps) => {
    return isEqual(props?.product?.id, nextProps?.product?.id);
});

ProductTileMemorizated.displayName = 'ProductTile';

export default ProductTileMemorizated;
