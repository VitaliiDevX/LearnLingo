import clsx from "clsx";
import css from "./Loader.module.css";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  inheritColor?: boolean;
}

export default function Loader({
  className,
  size = "md",
  inheritColor = false,
}: Props) {
  return (
    <div
      className={clsx(css.container, className, inheritColor && css.inherit)}
    >
      <div className={clsx(css.spinner, css[size])}></div>
    </div>
  );
}
