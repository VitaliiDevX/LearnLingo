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
      aria-hidden="true"
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
