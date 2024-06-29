import { create } from 'zustand';

type Store = {
  compare: boolean;
  toggle: () => void;
};

const useCompareStore = create<Store>()((set) => ({
  compare: false,
  toggle: () => set((state) => ({ compare: !state.compare })),
}));

export default useCompareStore;
