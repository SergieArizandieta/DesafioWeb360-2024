import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
   persist((set) => ({
      token: null,
      isAuth: false,
      idUserDPI: null,
      rolIdRol: null,
      setUserData: (token,idUserDPI,rolIdRol) => set({token,idUserDPI,rolIdRol,isAuth: true}),
      logout: () => set({ token: null, isAuth: false, idUserDPI: null, rolIdRol: null }),
   }), {
      name: "auth-storage"
   })
);
