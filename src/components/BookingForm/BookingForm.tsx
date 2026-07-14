import { BOOKING_OPTIONS } from "../../constants/forms";
import type { Teacher } from "../../types/teacher";
import Avatar from "../Avatar/Avatar";
import InputField from "../InputField/InputField";
import RadioGroup from "../RadioGroup/RadioGroup";
import css from "./BookingForm.module.css";

interface Props {
  teacher: Teacher;
}

export default function BookingForm({ teacher }: Props) {
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
      <InputField name="phone" placeholder="Phone number" />
    </>
  );
}
