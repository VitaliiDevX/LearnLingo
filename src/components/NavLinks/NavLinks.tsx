import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./NavLinks.module.css";

interface Props {
  direction?: "row" | "column";
  onClick?: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Teachers", href: "/teachers" },
];

export default function NavLinks({ direction = "row", onClick }: Props) {
  return (
    <nav className={clsx(css.nav, css[direction])} aria-label="Main navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          onClick={onClick}
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}
