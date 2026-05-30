import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./NavLinks.module.css";

interface Props {
  onClick?: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Teachers", href: "/teachers" },
];

export default function NavLinks({ onClick }: Props) {
    return (
    <nav className={css.nav} aria-label="Main navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          onClick={onClick}
          className={({ isActive }) => 
            clsx(css.link, isActive && css.active)
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}