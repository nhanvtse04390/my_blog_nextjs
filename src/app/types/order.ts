export type OrderItem = {
  _id: string;
  idProduct: string;
  nameProduct: string;
  priceProduct: number;
  image: string[];
  description: string;
  discount?: number;
  rating?: number;
  reviewsCount?: string;
  isActive?: boolean;
  quantity: number;
};
