export type orderItem = {
  _id: string;
  userName: string;
  userPhone:  string;
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
  orderStatus: string;
  paymentMethod: string;
  items: {
    _id: string;
    name: string;
    price: number;
    image: string[];
    description: string;
    discount?: number;
    rating?: number;
    reviewsCount?: string;
    isActive?: boolean
    ; quantity: number }[];
}