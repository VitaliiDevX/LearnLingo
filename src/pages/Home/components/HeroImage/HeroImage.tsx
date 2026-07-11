import Icon from "../../../../components/Icon/Icon";
import css from "./HeroImage.module.css";

export default function HeroImage() {
  return (
    <div className={css.wrapper}>
      <img src="/images/char.png" className={css.image} />
      <div className={css.laptop}>
        <Icon id="icon-apple" className={css.appleIcon} />
      </div>
    </div>
  );
}
