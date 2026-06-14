import { useState } from "react";
import type { Teacher } from "../../types/teacher";
import Avatar from "../Avatar/Avatar";
import Icon from "../Icon/Icon";
import css from "./TeacherCard.module.css";

interface Props {
  teacher: Teacher;
}

export const TeacherCard = ({ teacher }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    { label: "Lesson Info", value: teacher.lesson_info },
    { label: "Conditions", value: teacher.conditions.join(" ") },
  ];

  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <Avatar
          url={teacher.avatar_url}
          name={`${teacher.name} ${teacher.surname}`}
          size={96}
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
          <Icon id="icon-heart" className={css.iconHeart} />
        </div>

        <h3 className={css.title}>{`${teacher.name} ${teacher.surname}`}</h3>

        <ul className={css.infoList}>
          <li className={css.infoItem}>
            <span className={css.category}>Speaks: </span>
            <ul className={css.languagesList}>
              {teacher.languages.map((lang) => (
                <li key={lang}>
                  <button className={css.langTag}>{lang}</button>
                </li>
              ))}
            </ul>
          </li>

          {teacherInfo.map((item, index) => (
            <li key={index} className={css.infoItem}>
              <span className={css.category}>{`${item.label}: `}</span>
              {item.value}
            </li>
          ))}
        </ul>
        {isExpanded ? (
          <>
            <p className={css.experience}>{teacher.experience}</p>

            <ul className={css.reviewList}>
              {teacher.reviews.map((review, index) => (
                <li key={index} className={css.reviewItem}>
                  <Avatar
                    name={review.reviewer_name}
                    className={css.reviewAvatar}
                  />

                  <div className={css.reviewerInfo}>
                    <span className={css.reviewerName}>
                      {review.reviewer_name}
                    </span>
                    <span className={css.reviewerRating}>
                      <Icon id="icon-star" className={css.icon} />
                      {review.reviewer_rating.toFixed(1)}
                    </span>
                  </div>

                  <p className={css.comment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <button
            className={css.readMoreButton}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        <ul className={css.tags}>
          {teacher.levels.map((level) => (
            <li key={level}>
              <button className={`${css.tag} ${css.tagActive}`}>
                #{level}
              </button>
            </li>
          ))}
        </ul>
        {isExpanded && (
          <button className={css.bookButton}>Book trial lesson</button>
        )}
      </div>
    </div>
  );
};
