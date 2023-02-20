export interface ProductsProps {
    id: number;
    title: string;
    image: string;
    descr?: string;
    price: number;
    available?: boolean;
    count?: number;
    amount?: number;
}

export interface BasketReducerProps {
    filter?: string;
    available?: boolean;
    summa?: number;
    count?: number;
    page?: number;
    lastId?: number;
    products?: ProductsProps[];
    visibleProducts?: ProductsProps[];
    basket?: ProductsProps[];
    countProductPage?: number;
    countProducts?: number;
}

export interface BasketTileProps {
    product: ProductsProps;
    className?: string;
}

export interface PaginationProps {
    products: ProductsProps[];
}
