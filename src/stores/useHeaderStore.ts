import { create } from "zustand";

interface HeaderStore {
	isOpenProfileMenu: boolean;
	setIsOpenProfileMenu: () => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
	isOpenProfileMenu: false,
	setIsOpenProfileMenu: () =>
		set((state) => ({ isOpenProfileMenu: !state.isOpenProfileMenu })),
}));
