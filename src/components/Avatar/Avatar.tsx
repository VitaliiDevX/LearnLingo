import { useState } from "react";
import { getAvatarColors, getInitials } from "../../utils/avatar";
import css from "./Avatar.module.css";

interface Props {
  name: string;
  url?: string;
  className?: string;
  size?: number;
}

export default function Avatar({ name, url, className, size = 44 }: Props) {
  const [hasError, setHasError] = useState(false);
  const colors = getAvatarColors(name);

  const style = {
    "--avatar-size": `${size}px`,
    "--avatar-bg": colors.bg,
    "--avatar-text": colors.text,
  } as React.CSSProperties;

  return (
    <div
      className={`${css.avatarBase} ${!url || hasError ? css.initials : ""} ${className || ""}`}
      style={style}
    >
      {url && !hasError ? (
        <img
          src={url}
          alt={name}
          onError={() => setHasError(true)}
          className={css.img}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
