import { createSelector } from '@reduxjs/toolkit';

export const selectPage = (state) => state.basket.page;
export const selectCountProducts = (state) => state.basket.countProducts;
export const selectProductsBasket = (state) => state.basket.basket;
export const selectCountProductPage = (state) => state.basket.countProductPage;
export const selectProducts = (state) => state.basket.products;
export const selectVisibleProducts = (state) => state.basket.visibleProducts;
export const selectLastProductAction = (state) => state.basket.lastId;
export const selectFilter = (state) => state.basket.filter;
export const selectAvailable = (state) => state.basket.available;

export const selectProductsByFilter = createSelector(
    [selectProducts, selectAvailable],
    (allProducts, available) => {
        return allProducts.filter(
            (product) => (available && product.available && product.count) || !available
        );
    }
);

export const selectCountPages = createSelector(
    [selectCountProducts, selectCountProductPage],
    (countProducts, countProductPage) => {
        return Math.round(countProducts / countProductPage);
    }
);

export const selectProductInBasket = createSelector(
    [selectProductsBasket, selectLastProductAction],
    (basketProducts, id) => basketProducts.filter((prod) => prod.id === id)
);
