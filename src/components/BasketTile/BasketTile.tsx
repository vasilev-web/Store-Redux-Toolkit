import React from 'react';
import clsx from 'clsx';

import './BasketTile.module.scss';
import { useAppDispatch } from '@store/hooks';

import * as reducers from '@store/basketReducer';
import { BasketTileProps } from '@store/types';

const BasketTile = ({ product, className }: BasketTileProps) => {
    const dispatch = useAppDispatch();

    // Обработчик кнопки удаления из корзины
    const handlerRemove = (id: number) => {
        dispatch(reducers.removeBasketProduct(id)); // Удаляет товар из корзины
        dispatch(reducers.setAmountProduct(id)); // Устанавливает кол-во товара
        dispatch(reducers.setSumma(id)); // Пересчитывает сумму в корзине
    };

    return (
        <div className={clsx('products__goods-item', className && className)}>
            <div className='products__goods-image'>
                <img src={product.image} width='45' height='45' alt='' />
            </div>
            <div className='products__goods-title'>{product.title}</div>
            <div className='products__goods-amount'>
                <span className='products__goods-amount-number'>x{product.count}</span>
            </div>
            <div onClick={() => handlerRemove(product.id)} className='products__goods-remove'></div>
        </div>
    );
};

export default BasketTile;
