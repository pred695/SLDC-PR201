import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  username: string;
  userEmail: string;
  userId: string;
  userRegion: string;
  addAuth: () => void;
  removeAuth: () => void;
  setUserName: (username: string) => void;
  setUserEmail: (userEmail: string) => void;
  setUserId: (userId: string) => void;
  setAdmin: (isAdmin: boolean) => void;
  setUserRegion: (userRegion: string) => void;
}
// eslint-disable-next-line @typescript-eslint/typedef
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      username: '',
      userEmail: '',
      userId: '',
      userRegion: '',
      isAdmin: false,

      addAuth: (): void => {
        set((state: AuthState) => ({
          ...state,
          isAuth: true,
        }));
      },

      removeAuth: (): void => {
        set((state: AuthState) => ({
          ...state,
          isAuth: false,
        }));
      },

      setUserName: (username: string): void => {
        set((state: AuthState) => ({
          ...state,
          username,
        }));
      },

      setUserEmail: (userEmail: string): void => {
        set((state: AuthState) => ({
          ...state,
          userEmail,
        }));
      },

      setUserId: (userId: string): void => {
        set((state: AuthState) => ({
          ...state,
          userId,
        }));
      },
      setAdmin: (isAdmin: boolean): void => {
        set((state: AuthState) => ({
          ...state,
          isAdmin,
        }));
      },
      setUserRegion: (userRegion: string): void => {
        set((state: AuthState) => ({
          ...state,
          userRegion,
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
