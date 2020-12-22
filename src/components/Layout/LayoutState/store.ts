import create from "zustand";

type LayoutStore = {
  login: boolean;
  register: boolean;
  contact: boolean;
  setLoginActive: () => void;
  setRegisterActive: () => void;
  setContactActive: () => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  login: true,
  register: false,
  contact: false,
  setLoginActive: () => set({ login: true, register: false, contact: false }),
  setRegisterActive: () =>
    set({ register: true, login: false, contact: false }),
  setContactActive: () => set({ register: false, login: false, contact: true }),
}));
