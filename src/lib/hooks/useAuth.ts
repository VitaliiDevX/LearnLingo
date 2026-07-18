import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore";
import { login, logout, register } from "../services/auth";
import { getErrorMessage } from "../../utils/errorHandling";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      toast.success("Successfully logged in!");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      setUser(user);
      toast.success("Account created successfully!");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearIsAuthenticated();
    },
    onError: () => {
      clearIsAuthenticated();
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
