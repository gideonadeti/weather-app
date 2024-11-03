import { create } from "zustand";

interface WindStoreProps {
  wind: "wind_kph" | "wind_mph";

  setWind: (wind: "wind_kph" | "wind_mph") => void;
}

export const useWindStore = create<WindStoreProps>((set) => ({
  wind: "wind_kph",

  setWind: (newWind) => set({ wind: newWind }),
}));
