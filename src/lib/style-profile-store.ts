import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StyleProfile = {
  category: "Sofas" | "Möbel" | "Beleuchtung" | "Textilien" | "Deko";
  style: "warm" | "modern" | "natural";
  budget: "low" | "mid" | "high";
};

type StyleProfileState = {
  profile: StyleProfile | null;
  dismissed: boolean;
  setProfile: (profile: StyleProfile) => void;
  dismiss: () => void;
};

export const useStyleProfileStore = create<StyleProfileState>()(
  persist(
    (set) => ({
      profile: null,
      dismissed: false,
      setProfile: (profile) => set({ profile, dismissed: true }),
      dismiss: () => set({ dismissed: true }),
    }),
    { name: "webshop-style-profile" }
  )
);
