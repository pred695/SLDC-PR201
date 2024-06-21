import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  username: string;
  userEmail: string;
  userId: string;
  addAuth: () => void;
  removeAuth: () => void;
  setUserName: (username: string) => void;
  setUserEmail: (userEmail: string) => void;
  setUserId: (userId: string) => void;
  setAdmin: (isAdmin: boolean) => void;
}
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      username: '',
      userEmail: '',
      userId: '',
      isAdmin: false,

      addAuth: () => {
        set((state) => ({
          ...state,
          isAuth: true,
        }));
      },

      removeAuth: () => {
        set((state) => ({
          ...state,
          isAuth: false,
        }));
      },

      setUserName: (username: string) => {
        set((state) => ({
          ...state,
          username,
        }));
      },

      setUserEmail: (userEmail: string) => {
        set((state) => ({
          ...state,
          userEmail,
        }));
      },

      setUserId: (userId: string) => {
        set((state) => ({
          ...state,
          userId,
        }));
      },
      setAdmin: (isAdmin: boolean) => {
        set((state) => ({
          ...state,
          isAdmin,
        }));
      },
    }),

    {
      name: 'auth-storage',
      getStorage: () => sessionStorage,
    }
  )
);
export default useAuthStore;
