import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "../../types/user";
import { addToFavorites, removeFromFavorites } from "../services/teachers";
import { getErrorMessage } from "../../utils/errorHandling";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacherId: string) => {
      const cachedUser = queryClient.getQueryData<User>(["user"]);
      const currentFavs = cachedUser?.favorite_teachers || [];
      const isFavorite = currentFavs.includes(teacherId);

      return isFavorite
        ? await removeFromFavorites({ teacherId })
        : await addToFavorites({ teacherId });
    },
    onSuccess: (_, teacherId) => {
      const cachedUser = queryClient.getQueryData<User>(["user"]);
      const isNowFavorite = cachedUser?.favorite_teachers.includes(teacherId);

      toast.success(
        isNowFavorite
          ? "Teacher removed from favorites"
          : "Teacher added to favorites",
      );
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
