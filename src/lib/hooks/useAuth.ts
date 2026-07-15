import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import { login, logout, register } from "../services/auth";
import { getErrorMessage } from "../../utils/errorHandling";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const logoutStore = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["user"], user);
      toast.success("Successfully logged in!");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["user"], user);
      toast.success("Account created successfully!");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutStore();
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      if (!(err instanceof AxiosError && err.response?.status === 401)) {
        logoutStore();
        queryClient.removeQueries({ queryKey: ["user"] });
      }
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
