import css from "./Hero.module.css";
import HeroInfo from "../HeroInfo/HeroInfo";
import HeroImage from "../HeroImage/HeroImage";
import StatsBar from "../StatsBar/StatsBar";

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className="container">
        <div className={css.gridContainer}>
          <HeroInfo />
          <HeroImage />
        </div>

        <StatsBar />
      </div>
    </section>
  );
}
