import { create } from "zustand";

interface TempStoreProps {
  temp: "temp_c" | "temp_f";

  setTemp: (temp: "temp_c" | "temp_f") => void;
}

export const useTempStore = create<TempStoreProps>((set) => ({
  temp: "temp_c",

  setTemp: (newTemp) => set({ temp: newTemp }),
}));
