import React, { useMemo } from 'react';

import { useAppSelector } from '@store/hooks';
import ProductTile from '@components/ProductTile';
import { selectCountProductPage, selectPage, selectVisibleProducts } from '@store/selectors';

const ProductsList = () => {
    const page = useAppSelector(selectPage);
    const countProductPage = useAppSelector(selectCountProductPage);
    const products = useAppSelector(selectVisibleProducts);

    const sliceData = useMemo(() => {
        return [page * countProductPage - countProductPage, countProductPage * page];
    }, [page, countProductPage]);

    return (
        <div className='products__list grid'>
            {products.slice(...sliceData).map((product) => (
                <ProductTile key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductsList;
