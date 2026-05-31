import css from "./Hero.module.css";
import HeroInfo from "../HeroInfo/HeroInfo";
import HeroImage from "../HeroImage/HeroImage";
import StatsBar from "../StatsBar/StatsBar";
import clsx from "clsx";

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className={clsx(css.gridContainer, "container")}>
        <HeroInfo />
        <HeroImage />
        <StatsBar />
      </div>
    </section>
  );
}
