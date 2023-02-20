import React, { useCallback } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectCountProductPage } from '@store/selectors';

import * as reducers from '@store/basketReducer';

import './Pages.module.scss';

const Pages = () => {
    const dispatch = useAppDispatch();
    const counts = [5, 15, 20, 50];

    const setCount = useAppSelector(selectCountProductPage);

    const handlerPageCount = useCallback(
        (num: number) => {
            dispatch(reducers.setProductPage(num));
        },
        [dispatch]
    );

    return (
        <ul className='products__counts'>
            {counts.map((num, index) => (
                <li
                    className={clsx(
                        'products__counts-item',
                        setCount === num && 'products__counts-item--current'
                    )}
                    onClick={() => handlerPageCount(num)}
                    key={index}
                >
                    {num}
                </li>
            ))}
        </ul>
    );
};

export default Pages;
