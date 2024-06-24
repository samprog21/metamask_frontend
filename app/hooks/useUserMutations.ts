import { useAppDispatch } from '@/lib/hooks';
import {   useGetUsersQuery,
  useGetFilteredUsersQuery,
  useAddUserMutation,
  useLoginUserMutation
   } from '@/lib/features/user/userAPISlice';

export const useUserMutations = () => {
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();
  const [addUser] = useAddUserMutation();

  return { dispatch, loginUser, addUser };
};