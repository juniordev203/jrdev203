import axiosServices from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "./auth.type";
import ApiUrl from "@/lib/endpointApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  setAccessTokenCookie,
  setAccountIdLocalStorage,
  setRefreshTokenCookie,
} from "@/lib/serverHelper";

const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await axiosServices.post('ApiUrl.auth.login', payload);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const accountId = response.data.id;
    setAccessTokenCookie(accessToken);
    setRefreshTokenCookie(refreshToken);
    setAccountIdLocalStorage(accountId);
    return response.data;
  },
  register: async (payload: RegisterPayload) => {
    const response = await axiosServices.post('ApiUrl.auth.register', payload);
    return response.data;
  },
  logout: async () => {
    const response = await axiosServices.post('ApiUrl.auth.logout');
    return response.data;
  },
};

export const useLoginMutate = () => {
  return useMutation({
    mutationFn: authApi.login,
  });
};

export const useRegisterMutate = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};
export const useLogoutMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
