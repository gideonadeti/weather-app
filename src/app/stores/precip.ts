import { create } from "zustand";

interface PrecipStoreProps {
  precip: "precip_mm" | "precip_in";

  setPrecip: (precip: "precip_mm" | "precip_in") => void;
}

export const usePrecipStore = create<PrecipStoreProps>((set) => ({
  precip: "precip_mm",

  setPrecip: (newPrecip) => set({ precip: newPrecip }),
}));
