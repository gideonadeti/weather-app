import { create } from "zustand";

interface PressureStoreProps {
  pressure: "pressure_mb" | "pressure_in";

  setPressure: (pressure: "pressure_mb" | "pressure_in") => void;
}

export const usePressureStore = create<PressureStoreProps>((set) => ({
  pressure: "pressure_mb",

  setPressure: (newPressure) => set({ pressure: newPressure }),
}));
