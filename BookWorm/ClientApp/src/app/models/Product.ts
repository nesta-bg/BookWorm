export interface Product {
    id: number;
    title: string;
    price: number;
    categoryId: number;
    imageUrl: string;
}

export interface Category {
    id: number;
    valueName: string;
    displayName: string;
}

export interface ShoppingCartItem {
    id: number;
    quantity: number;
    bookId: number;
    shoppingCartId: number;
}
