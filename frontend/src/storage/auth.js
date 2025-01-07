import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
   persist((set) => ({
      token: null,
      isAuth: false,
      idUserDPI: null,
      rolIdRol: null,
      fullName: null,
      setUserData: (token,idUserDPI,rolIdRol,fullName) => set({token,idUserDPI,rolIdRol,fullName,isAuth: true}),
      logout: () => set({ token: null, isAuth: false, idUserDPI: null, rolIdRol: null }),
   }), {
      name: "auth-storage"
   })
);
