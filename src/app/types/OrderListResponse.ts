import {User} from "@/app/types/User";
import {OrderItem} from "@/app/types/order";

export type OrderListResponse = {
  _id: string;
  userId: User; // Gán kiểu dữ liệu cho User
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "COD" | "VNPay" | "Momo";
  paymentStatus: "pending" | "paid" | "failed";
  shippingAddress?: string;
  orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "canceled";
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}