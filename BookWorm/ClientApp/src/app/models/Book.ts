export interface Book {
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
