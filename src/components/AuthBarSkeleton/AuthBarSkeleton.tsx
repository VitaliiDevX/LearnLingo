import css from "./AuthBarSkeleton.module.css";

export default function AuthBarSkeleton() {
  return (
    <div className={css.wrapper}>
      <div className={css.skeletonLogin} />
      <div className={css.skeletonRegister} />
    </div>
  );
}
