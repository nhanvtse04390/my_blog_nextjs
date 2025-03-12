import { create } from "zustand";

type DisabledState = {
  isDisabled: boolean;
  setDisabled: (Disabled: boolean) => void;
};

export const disabledSate = create<DisabledState>((set) => ({
  isDisabled: false,
  setDisabled: (Disabled) => set({ isDisabled: Disabled }),
}));
