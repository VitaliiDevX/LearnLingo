import { STATS } from "../../../../constants/stats";
import css from "./StatsBar.module.css";

export default function StatsBar() {
  return (
    <div className={css.wrapper}>
      <dl className={css.statsList}>
        {STATS.map(({ id, value, label }) => (
          <div key={id} className={css.statCard}>
            <dd className={css.statValue}>{`${value} +`}</dd>

            <dt className={css.statLabel}>{label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
