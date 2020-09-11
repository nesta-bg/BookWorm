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

export interface ShoppingCart {
    id: number;
    dateCreated: string;
    shoppingCartItems: ShoppingCartItem[];
}

export interface ShoppingCartItem {
    id: number;
    quantity: number;
    bookId: number;
    shoppingCartId: number;
}
