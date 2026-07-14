import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        const { isAuthenticated, logout } = useAuthStore.getState();
        if (isAuthenticated) {
          toast.warning("Session expired. Please login again.");
          queryClient.removeQueries();
          logout();
        }
      }
    },
  }),
});
