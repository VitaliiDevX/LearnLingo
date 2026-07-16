import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "../../types/user";
import { addToFavorites, removeFromFavorites } from "../services/teachers";
import { getErrorMessage } from "../../utils/errorHandling";
import type { FavoriteActionResponse } from "../../types/teacher";

interface ToggleFavoriteParams {
  teacherId: string;
  isFavorite: boolean;
}

interface ToggleFavoriteContext {
  previousUser: User | undefined;
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation<
    FavoriteActionResponse,
    Error,
    ToggleFavoriteParams,
    ToggleFavoriteContext
  >({
    mutationFn: async ({ teacherId, isFavorite }: ToggleFavoriteParams) => {
      return isFavorite
        ? await removeFromFavorites({ teacherId })
        : await addToFavorites({ teacherId });
    },

    onMutate: async ({ teacherId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousUser = queryClient.getQueryData<User>(["user"]);

      queryClient.setQueryData<User>(["user"], (old) => {
        if (!old) return old;
        return {
          ...old,
          favorite_teachers: isFavorite
            ? old.favorite_teachers.filter((id) => id !== teacherId)
            : [...old.favorite_teachers, teacherId],
        };
      });

      return { previousUser };
    },

    onSuccess: (_, { isFavorite }) => {
      toast.success(
        isFavorite
          ? "Teacher removed from favorites"
          : "Teacher added to favorites",
      );
    },

    onError: (err, _, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData<User>(["user"], context.previousUser);
      }
      toast.error(getErrorMessage(err));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
