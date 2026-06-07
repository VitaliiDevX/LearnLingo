import type { Teacher } from "../../types/teacher";
import Icon from "../Icon/Icon";
import css from "./TeacherCard.module.css";

interface Props {
  teacher: Teacher;
}

export const TeacherCard = ({ teacher }: Props) => {
  const teacherMeta = [
    { label: "Lessons online", value: null, iconId: "icon-open-book" },
    { label: "Lessons done:", value: teacher.lessons_done, iconId: null },
    { label: "Rating:", value: teacher.rating, iconId: "icon-star" },
    {
      label: "Price / 1 hour:",
      value: `${teacher.price_per_hour}$`,
      iconId: null,
      isHighlighted: true,
    },
  ];

  const teacherInfo = [
    {
      label: "Speaks",
      value: teacher.languages.join(", "),
      isUnderlined: true,
    },
    { label: "Lesson Info", value: teacher.lesson_info },
    { label: "Conditions", value: teacher.conditions.join(" ") },
  ];

  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className={css.avatar}
        />
        <div className={css.statusIndicator} />
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <span className={css.category}>Languages</span>

          <ul className={css.metaList}>
            {teacherMeta.map((item, index) => (
              <li key={index} className={css.metaItem}>
                {item.iconId && <Icon id={item.iconId} className={css.icon} />}

                <span>
                  {item.label}

                  {item.value && (
                    <span className={item.isHighlighted ? css.highlight : ""}>
                      {` ${item.value}`}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <h3 className={css.title}>{`${teacher.name} ${teacher.surname}`}</h3>
        <ul className={css.infoList}>
          {teacherInfo.map((item, index) => (
            <li key={index} className={css.infoItem}>
              <>
                <span className={css.category}>{`${item.label}: `}</span>

                {item.value && (
                  <span className={item.isUnderlined ? css.underline : ""}>
                    {`${item.value}`}
                  </span>
                )}
              </>
            </li>
          ))}
        </ul>

        <div className={css.tags}>
          {teacher.levels.map((level) => (
            <button key={level} className={`${css.tag} ${css.tagActive}`}>
              #{level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
