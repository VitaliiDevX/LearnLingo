import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTeachers } from "../../lib/services/teachers";
import TeacherList from "../../components/TeacherList/TeacherList";
import Loader from "../../components/Loader/Loader";
import { INITIAL_PAGE, TEACHERS_PER_PAGE } from "../../constants/pagination";
import css from "./Teachers.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import type { FilterUpdate } from "../../types/filters";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import { getErrorMessage } from "../../utils/errorHandling";

export default function Teachers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    language: searchParams.get("language") || "",
    level: searchParams.get("level") || "",
    price: searchParams.get("price") || "",
  };

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
    queryKey: ["teachers", filters],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      getTeachers({
        page: pageParam,
        perPage: TEACHERS_PER_PAGE,
        language: filters.language,
        level: filters.level,
        price: filters.price ? Number(filters.price) : undefined,
      }),
    gcTime: 0,
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const handleFilterChange = (newFilters: FilterUpdate) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const teachers = data?.pages.flatMap((p) => p.teachers) || [];
  const isDataEmpty = !isPending && !isError && teachers.length === 0;

  return (
    <section className={css.section}>
      <div className="mainContainer">
        <div className={css.filterWrapper}>
          <SearchBox filters={filters} onChange={handleFilterChange} />
        </div>
        {isPending && <Loader />}

        {isError && (
          <InfoMessage
            message={getErrorMessage(error)}
            onRetry={refetch}
            buttonText="Try again"
          />
        )}

        {isDataEmpty && (
          <InfoMessage message="Sorry, we couldn't find any teachers matching your criteria." />
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
