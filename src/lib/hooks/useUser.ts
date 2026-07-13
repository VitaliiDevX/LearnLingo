import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/user";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};
