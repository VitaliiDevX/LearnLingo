import type { Teacher } from "../../types/teacher";
import { TeacherCard } from "../TeacherCard/TeacherCard";
import css from "./TeacherList.module.css";

interface Props {
  teachers: Teacher[];
}

export default function TeacherList({ teachers }: Props) {
  return (
    <ul className={css.list}>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </ul>
  );
}
