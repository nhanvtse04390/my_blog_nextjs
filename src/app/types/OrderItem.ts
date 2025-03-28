export type orderItem = {
  _id: string;
  userName: string;
  userPhone:  string;
  totalAmount: number;
  shippingAddress: string;
  createdAt: Date;
  orderStatus: string;
  paymentMethod: string;
}