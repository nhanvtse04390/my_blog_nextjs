export type Product = {
    _id: number;
    name: string;
    price: number;
    image: string[];
    description: string;
    discount?: number;
    rating?: number;
    reviewsCount?: string;
};