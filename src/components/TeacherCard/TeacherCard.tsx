import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";
import { FORMS_CONFIG, type FormType } from "../../constants/forms";
import { motion, AnimatePresence } from "framer-motion";
import ModalForm from "../ModalForm/ModalForm";
import BookingForm from "../BookingForm/BookingForm";
import Avatar from "../Avatar/Avatar";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import { Heart } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import InfoModal from "../InfoModal/InfoModal";
import { MODAL_TEXTS, type ModalType } from "../../constants/modals";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import clsx from "clsx";
import { useToggleFavorite } from "../../lib/hooks/useToggleFavorite";

interface Props {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalType, setModalType] = useState<FormType | ModalType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  const activeLanguage = searchParams.get("language");
  const activeLevel = searchParams.get("level");

  const isFavorite = user?.favorite_teachers.includes(teacher._id) ?? false;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      setModalType("authRequired");
      return;
    }
    toggleFavorite({ teacherId: teacher._id, isFavorite });
  };

  const closeModal = () => setModalType(null);

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

  const formConfig =
    modalType && modalType in FORMS_CONFIG
      ? FORMS_CONFIG[modalType as FormType]
      : null;

  const textConfig =
    modalType && modalType in MODAL_TEXTS
      ? MODAL_TEXTS[modalType as ModalType]
      : null;

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
          <button
            onClick={handleToggleFavorite}
            disabled={isPending}
            className={clsx(css.favButton, isFavorite ? css.isFavorite : "")}
            aria-label="Toggle favorite"
          >
            <Heart size={26} className={css.iconHeart} />
          </button>
        </div>
        <h3 className={css.title}>{`${teacher.name} ${teacher.surname}`}</h3>
        <ul className={css.infoList}>
          <li className={css.infoItem}>
            <span className={css.category}>Speaks: </span>
            <ul className={css.languagesList}>
              {teacher.languages.map((lang) => (
                <li key={lang}>
                  <button
                    className={css.langTag}
                    onClick={() => updateFilter("language", lang)}
                    disabled={activeLanguage === lang}
                  >
                    {lang}
                  </button>
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
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              className={css.motionWrapper}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className={css.readMoreButton}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
        <ul className={css.tags}>
          {teacher.levels.map((level) => (
            <li key={level}>
              <button
                className={css.tag}
                onClick={() => updateFilter("level", level)}
                disabled={activeLevel === level}
              >
                #{level}
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={css.motionWrapper}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <button
                className={css.bookButton}
                onClick={() => setModalType("booking")}
              >
                Book trial lesson
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {modalType && (
          <Modal onClose={closeModal}>
            {textConfig ? (
              <InfoModal
                title={textConfig.title}
                description={textConfig.description}
                primaryAction={{
                  label: "Log in",
                  onClick: () => setModalType("login"),
                }}
                secondaryAction={{
                  label: "Registration",
                  onClick: () => setModalType("register"),
                }}
              />
            ) : formConfig ? (
              <ModalForm {...formConfig} onSubmit={(data) => console.log(data)}>
                {modalType === "booking" && <BookingForm teacher={teacher} />}
                {modalType === "login" && <LoginForm />}
                {modalType === "register" && <RegisterForm />}
              </ModalForm>
            ) : null}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
