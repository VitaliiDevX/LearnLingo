import type { Teacher } from "../../types/teacher";
import Pagination from "../Pagination/Pagination";
import TeacherCard from "../TeacherCard/TeacherCard";
import css from "./TeacherList.module.css";

interface Props {
  teachers: Teacher[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export default function TeacherList({
  teachers,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: Props) {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher._id} teacher={teacher} />
        ))}
      </ul>
      {hasNextPage && (
        <Pagination
          fetchNextPage={() => fetchNextPage()}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
