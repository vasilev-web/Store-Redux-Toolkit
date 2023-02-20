import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { setPage } from '@store/basketReducer';

import './Pagination.module.scss';
import { selectPage, selectCountPages } from '@store/selectors';

const Pagination = () => {
    const dispatch = useAppDispatch();

    const page = useAppSelector(selectPage);
    const countPages = useAppSelector(selectCountPages);

    return (
        <>
            {countPages > 3 && page > 2 ? (
                <li
                    onClick={() => dispatch(setPage(page - 1))}
                    className='products__pagination-item products__pagination-prev'
                >
                    &lt;
                </li>
            ) : (
                ''
            )}

            {page == countPages ? (
                <li
                    onClick={() => dispatch(setPage(page - 2))}
                    className='products__pagination-item next'
                >
                    {page - 2}
                </li>
            ) : (
                ''
            )}

            {page - 1 >= 1 ? (
                <li
                    onClick={() => dispatch(setPage(page - 1))}
                    className='products__pagination-item prev'
                >
                    {page - 1}
                </li>
            ) : (
                ''
            )}

            {
                <li
                    onClick={() => dispatch(setPage(page))}
                    className='products__pagination-item products__pagination-item-current'
                >
                    {page}
                </li>
            }

            {page + 1 <= countPages ? (
                <li
                    onClick={() => dispatch(setPage(page + 1))}
                    className='products__pagination-item next'
                >
                    {page + 1}
                </li>
            ) : (
                ''
            )}

            {page == 1 ? (
                <li
                    onClick={() => dispatch(setPage(page + 2))}
                    className='products__pagination-item next'
                >
                    {page + 2}
                </li>
            ) : (
                ''
            )}

            {countPages > 4 && page + 1 < countPages ? (
                <>
                    <li className='products__pagination-item products__pagination-empty'>...</li>
                    <li
                        onClick={() => dispatch(setPage(countPages))}
                        className='products__pagination-item'
                    >
                        {countPages}
                    </li>
                </>
            ) : (
                ''
            )}

            {countPages > 3 && page + 1 <= countPages ? (
                <li
                    onClick={() => dispatch(setPage(page + 1))}
                    className='products__pagination-item products__pagination-next'
                >
                    &gt;
                </li>
            ) : (
                ''
            )}
        </>
    );
};

export default Pagination;
