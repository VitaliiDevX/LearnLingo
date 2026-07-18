import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { getUserProfile } from "../../lib/services/user";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
