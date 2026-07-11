interface IconProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ id, className = "", style }: IconProps) {
  return (
    <svg
      className={className}
      style={{ display: "block", ...style }}
      width="20"
      height="20"
      aria-hidden="true"
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
