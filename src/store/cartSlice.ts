import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

interface CartState {
  items: CartProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCartItems: (state, action: PayloadAction<CartProduct[]>) => {
      state.items = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<CartProduct>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
      if (state.items.length === 0) {
        localStorage.setItem("productCart", JSON.stringify([]));
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateQuantity,
  initCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
export type { CartState };
