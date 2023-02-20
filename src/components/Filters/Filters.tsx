import React from 'react';
import clsx from 'clsx';

import './Filters.module.scss';
import { useAppSelector, useAppDispatch } from '@store/hooks';

import { setPage, setFilter, setAvailable } from '@store/basketReducer';
import { FILTER_DEFAULT, FILTER_PRICE, FILTER_AVAILABLE } from '@components/Basket/Basket.locale';
import { selectFilter } from '@store/selectors';

const Filters = () => {
    const filter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    const handlerFilter = (type: string) => {
        dispatch(setPage(1));
        dispatch(setFilter(type));
    };

    const handlerCheckbox = (e: { target: { checked: any } }) => {
        dispatch(setPage(1));
        dispatch(setAvailable(e.target.checked));
    };

    return (
        <div className='products__filter'>
            <ul className='products__filter-list'>
                <li
                    onClick={() => handlerFilter('id')}
                    className={clsx(
                        'products__filter-item',
                        !filter || (filter === 'id' && 'products__filter-item--active')
                    )}
                >
                    {FILTER_DEFAULT}
                </li>
                <li
                    onClick={() => handlerFilter('price')}
                    className={clsx(
                        'products__filter-item',
                        filter === 'price' && 'products__filter-item--active'
                    )}
                >
                    {FILTER_PRICE}
                </li>
            </ul>
            <label className='products__filter-check'>
                <input onChange={handlerCheckbox} type='checkbox' name='available' />
                {FILTER_AVAILABLE}
            </label>
        </div>
    );
};

export default Filters;
