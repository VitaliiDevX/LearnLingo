import { useFormContext } from "react-hook-form";
import { BOOKING_OPTIONS } from "../../constants/forms";
import { useAuthStore } from "../../store/useAuthStore";
import type { Teacher } from "../../types/teacher";
import Avatar from "../Avatar/Avatar";
import InputField from "../InputField/InputField";
import RadioGroup from "../RadioGroup/RadioGroup";
import css from "./BookingForm.module.css";
import { useEffect } from "react";

interface Props {
  teacher: Teacher;
}

export default function BookingForm({ teacher }: Props) {
  const { user } = useAuthStore();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  return (
    <>
      <div className={css.teacherInfoWrapper}>
        <Avatar
          url={teacher.avatar_url}
          name={`${teacher.name} ${teacher.surname}`}
        />
        <div className={css.textInfo}>
          <p className={css.label}>Your teacher</p>
          <p>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>
      <RadioGroup
        title={BOOKING_OPTIONS.question}
        name={BOOKING_OPTIONS.name}
        options={BOOKING_OPTIONS.reasons}
      />
      <InputField name="name" placeholder="Name" />
      <InputField name="email" placeholder="Email" />
      <InputField
        name="phone"
        placeholder="+## (###) ### ## ##"
        mask="+## (###) ### ## ##"
      />
    </>
  );
}
