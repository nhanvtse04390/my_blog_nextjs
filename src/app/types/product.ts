export type Product = {
    id: number;
    name: string;
    price: number;
    image?: string | undefined;
    description: string;
    discount?: number;
};