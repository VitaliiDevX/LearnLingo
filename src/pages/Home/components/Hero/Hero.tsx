import css from "./Hero.module.css";
import HeroInfo from "../HeroInfo/HeroInfo";
import HeroImage from "../HeroImage/HeroImage";
import StatsBar from "../StatsBar/StatsBar";

export default function Hero() {
  return (
    <section className={css.section}>
      <div className={css.gridContainer}>
        <HeroInfo />
        <HeroImage />
        <StatsBar />
      </div>
    </section>
  );
}
