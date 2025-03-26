import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Product} from "@/app/types/product";

type CartState = {
    cart: (Product & { quantity: number })[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product, quantity: number) =>
                set((state) => {
                    const existingItemWithQuantity = state.cart.find((item) => item._id === product._id && item.quantity === quantity);
                    if (existingItemWithQuantity) {
                        return {cart: [...state.cart]};
                    } else {
                        return {cart: [...state.cart, {...product, quantity: quantity}]};
                    }
                }),

            removeFromCart: (index) =>
                set((state) => ({
                    cart: state.cart.filter((_, i) => i !== index),
                })),

            clearCart: () => set({cart: []}),
        }),
        {name: "cart-storage"}
    )
);
