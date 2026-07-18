import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore";
import { addToFavorites, removeFromFavorites } from "../services/teachers";
import { getErrorMessage } from "../../utils/errorHandling";
import type { FavoriteActionResponse } from "../../types/teacher";

interface ToggleFavoriteParams {
  teacherId: string;
  isFavorite: boolean;
}

export const useToggleFavorite = () => {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<FavoriteActionResponse, Error, ToggleFavoriteParams>({
    mutationFn: async ({ teacherId, isFavorite }: ToggleFavoriteParams) => {
      return isFavorite
        ? await removeFromFavorites({ teacherId })
        : await addToFavorites({ teacherId });
    },

    onMutate: async ({ teacherId, isFavorite }) => {
      if (!user) return;

      setUser({
        ...user,
        favorite_teachers: isFavorite
          ? user.favorite_teachers.filter((id) => id !== teacherId)
          : [...user.favorite_teachers, teacherId],
      });
    },

    onError: (err, { teacherId, isFavorite }) => {
      if (user) {
        setUser({
          ...user,
          favorite_teachers: isFavorite
            ? [...user.favorite_teachers, teacherId]
            : user.favorite_teachers.filter((id) => id !== teacherId),
        });
      }
      toast.error(getErrorMessage(err));
    },

    onSuccess: (_, { isFavorite }) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      toast.success(
        isFavorite
          ? "Teacher removed from favorites"
          : "Teacher added to favorites",
      );
    },
  });
};
