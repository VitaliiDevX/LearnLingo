import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../../utils/errorHandling";
import { bookLesson } from "../services/booking";

export const useBooking = () => {
  const bookMutation = useMutation({
    mutationFn: bookLesson,
    onSuccess: () => {
      toast.success("Lesson booked successfully!");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  return {
    book: bookMutation.mutate,
    isBooking: bookMutation.isPending,
  };
};
