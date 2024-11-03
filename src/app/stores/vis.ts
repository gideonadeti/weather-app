import { create } from "zustand";

interface VisStoreProps {
  vis: "vis_km" | "vis_miles";

  setVis: (vis: "vis_km" | "vis_miles") => void;
}

export const useVisStore = create<VisStoreProps>((set) => ({
  vis: "vis_km",

  setVis: (newVis) => set({ vis: newVis }),
}));
