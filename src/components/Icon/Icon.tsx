interface IconProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ id, className, style }: IconProps) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <source src={`/sprite.svg#${id}`} />
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
