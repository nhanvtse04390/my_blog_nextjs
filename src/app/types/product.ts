export type Product = {
    _id: number;
    name: string;
    price: number;
    image: string[];
    description: string;
    discount?: number;
};