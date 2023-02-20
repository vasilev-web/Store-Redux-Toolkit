import { BasketReducerProps, ProductsProps } from '@store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultState: BasketReducerProps = {
    filter: 'id',
    available: false,
    summa: 0,
    count: 0,
    page: 1,
    products: [],
    visibleProducts: [],
    basket: [],
    countProductPage: 15,
    countProducts: 0
};

const basketSlice = createSlice({
    name: 'basket',
    initialState: defaultState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.visibleProducts.sort((a, b) => {
                if (action.payload === 'id') {
                    return a['id'] - b['id'];
                } else if (action.payload === 'price') {
                    return a['price'] - b['price'];
                }
            });
            state.filter = action.payload;
        },
        setAvailable(state, action) {
            state.available = action.payload;
            state.visibleProducts = state.products.filter(
                (product) =>
                    (action.payload && product.available && product.count) || !action.payload
            );
            state.countProducts = state.visibleProducts.length;
        },
        setSumma(state, action: PayloadAction<number>) {
            state.summa = state.basket.reduce(
                (prev, current) => prev + current.price * current.count,
                0
            );
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        setProductPage(state, action: PayloadAction<number>) {
            state.countProductPage = action.payload;
        },
        setProducts(state, action: PayloadAction<ProductsProps[]>) {
            state.products = action.payload;
            state.visibleProducts = action.payload;
        },
        setCountProducts(state, action: PayloadAction<number>) {
            state.countProducts = action.payload;
        },
        setBasketProducts(state, action: PayloadAction<number>) {
            const findInBasket =
                state.basket.findIndex((product) => product.id === action.payload) !== -1;

            findInBasket
                ? state.basket.map((product, index) => {
                      if (product.id === action.payload) {
                          state.basket[index].count = product.count + 1;
                      }
                  })
                : (state.basket = [
                      ...state.basket,
                      ...state.visibleProducts
                          .filter((product) => product.id === action.payload)
                          .map((product) => {
                              return {
                                  ...product,
                                  count: 1
                              };
                          })
                  ]);
        },
        setDecrementProduct(state, action: PayloadAction<number>) {
            state.visibleProducts.map((product, index) => {
                if (product.id === action.payload) {
                    state.visibleProducts[index].count = product.count - 1;
                }

                return product;
            });
        },
        removeBasketProduct(state, action: PayloadAction<number>) {
            state.basket = state.basket.filter((product) => product.id !== action.payload);
        },
        setAmountProduct(state, action: PayloadAction<number>) {
            state.visibleProducts = state.visibleProducts.map((product, index) => {
                if (product.id === action.payload) {
                    state.visibleProducts[index].count = product.amount;
                }

                return product;
            });
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        }
    }
});

export const {
    setFilter,
    setAvailable,
    setSumma,
    setCount,
    setProductPage,
    setProducts,
    setCountProducts,
    setBasketProducts,
    setDecrementProduct,
    removeBasketProduct,
    setAmountProduct,
    setPage
} = basketSlice.actions;

export default basketSlice.reducer;
