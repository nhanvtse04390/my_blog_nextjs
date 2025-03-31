import {Product} from "@/app/types/product";

export type orderItem = {
  _id: string;
  userName: string;
  userPhone:  string;
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
  orderStatus: string;
  paymentMethod: string;
  items: { product: Product; quantity: number }[];
}