import { create } from 'zustand';
import ApiService from '@/services/api-service';
import { persist } from 'zustand/middleware';
import {
  initialState, UpdateResponse, UpdateState, UpdateUserActions,
  UpdateUserFormValues,
} from '@/types/update-user';
import useAuth from './use-auth';

const useUpdate = create<UpdateState & UpdateUserActions>()(persist(
  (set) => ({
    ...initialState,
    update: async (values: UpdateUserFormValues) => {
      try {
        const { user: currentUser } = useAuth.getState();
        if (!currentUser) {
          set({ error: 'User not authenticated' });
          return;
        }

        const response = await ApiService.put<UpdateResponse>(`/user/${currentUser.id}`, values);

        if (response.status === 200) {
          const { userWithoutPassword: updatedUser, token: newToken } = response.data;
          set({ user: updatedUser, token: newToken, error: null });
          const { setUser } = useAuth.getState();
          setUser(updatedUser);
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Something went wrong. Please try again later.';
        set({ error: errorMessage });
      }
    },
  }),
  {
    name: 'user',
    partialize: (state) => Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => !['error'].includes(key),
      ),
    ),
  },
));

export default useUpdate;
