import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser } from "../../lib/hooks/useUser";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { data: user, isLoading, isError } = useUser();
  const setUser = useAuthStore((state) => state.setUser);
  const logoutUser = useAuthStore((state) => state.logout);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    if (!isLoading) {
      if (user) setUser(user);
      else if (isError) logoutUser();

      setInitialized();
    }
  }, [user, isLoading, isError, setUser, logoutUser, setInitialized]);

  return children;
};
