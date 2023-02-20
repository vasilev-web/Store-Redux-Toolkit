import React from 'react';

import './BasketList.module.scss';
import BasketTile from '@components/BasketTile';
import FormaterPrice from '@helpers/FormaterPrice';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '@store/hooks';
import { TOTAL, ORDER, BASKET_EMPTY } from '@components/Basket/Basket.locale';

const BasketList = () => {
    const productBasket = useAppSelector((state) => state.basket.basket);
    const summaBasket = useAppSelector((state) => state.basket.summa);

    return (
        <div className='products__basket-wrapper'>
            {productBasket?.length ? (
                <div className='products__goods'>
                    {productBasket.map((product) => (
                        <BasketTile key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                ''
            )}
            {productBasket && productBasket.length ? (
                <div className='products__total'>
                    <div className='products__total-title'>{TOTAL}</div>
                    <div className='products__total-price'>{FormaterPrice(summaBasket)}</div>
                    <Button className='products__total-button'>{ORDER}</Button>
                </div>
            ) : (
                <div className='products__total'>
                    <div className='products__total-title'>{BASKET_EMPTY}</div>
                </div>
            )}
        </div>
    );
};

export default BasketList;
