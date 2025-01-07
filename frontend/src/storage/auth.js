import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
   persist((set) => ({
      token: null,
      isAuth: false,
      idUserDPI: null,
      rolIdRol: null,
      fullName: null,
      shoppingCart: [],
      setUserData: (token,idUserDPI,rolIdRol,fullName) => set({token,idUserDPI,rolIdRol,fullName,isAuth: true, shoppingCart: []}),
      setProduct : (product) => set((state) => ({shoppingCart: [...state.shoppingCart, product]})),
      setSoppingCart: (shoppingCart) => set({shoppingCart}),
      delAllShoppingCart: () => set({shoppingCart: []}),
      setToken: (token) => set({ token }),
      logout: () => set({ token: null, isAuth: false, idUserDPI: null, rolIdRol: null }),
   }), {
      name: "auth-storage"
   })
);
