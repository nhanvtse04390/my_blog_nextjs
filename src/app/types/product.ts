export type Product = {
    _id: string;
    name: string;
    price: number;
    image: string[];
    description: string;
    discount?: number;
    rating?: number;
    reviewsCount?: string;
    isActive?: boolean;
};