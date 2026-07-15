import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./Favorites.module.css";
import TeacherList from "../../components/TeacherList/TeacherList";
import Loader from "../../components/Loader/Loader";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import { getErrorMessage } from "../../utils/errorHandling";
import { getFavoriteTeachers } from "../../lib/services/teachers";
import { INITIAL_PAGE, TEACHERS_PER_PAGE } from "../../constants/pagination";

export default function Favorites() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["favorites"],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      getFavoriteTeachers({
        page: pageParam,
        perPage: TEACHERS_PER_PAGE,
      }),
    gcTime: 0,
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const teachers = data?.pages.flatMap((p) => p.teachers) || [];
  const isDataEmpty = !isPending && !isError && teachers.length === 0;

  return (
    <section className={css.section}>
      <div className="mainContainer">
        <h1 className={css.title}>Favorite Teachers</h1>

        {isPending && <Loader />}

        {isError && (
          <InfoMessage
            message={getErrorMessage(error)}
            onRetry={refetch}
            buttonText="Try again"
          />
        )}

        {isDataEmpty && (
          <InfoMessage message="You haven't added any teachers to your favorites yet." />
        )}

        {!isDataEmpty && isSuccess && (
          <TeacherList
            teachers={teachers}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
          />
        )}
      </div>
    </section>
  );
}
