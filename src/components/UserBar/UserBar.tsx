import { Heart, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import css from "./UserBar.module.css";
import Avatar from "../Avatar/Avatar";
import { NavLink } from "react-router";
import clsx from "clsx";
import { useAuth } from "../../lib/hooks/useAuth";

interface Props {
  direction?: "row" | "column";
  onClick?: () => void;
}

export default function UserBar({ direction = "row", onClick }: Props) {
  const user = useAuthStore((state) => state.user);

  const { logout, isLoggingOut } = useAuth();

  const handleLogout = () => {
    onClick?.();
    logout();
  };

  return (
    <div className={clsx(css.wrapper, css[direction])}>
      <div className={css.contentWrapper}>
        <NavLink
          to="/favorites"
          onClick={onClick}
          className={({ isActive }) =>
            clsx(css.favButton, isActive && css.active)
          }
          title="Favorite teachers"
        >
          <Heart size={24} className={css.iconHeart} />
        </NavLink>
        {user && <Avatar size={48} name={user.name} />}
      </div>
      <button
        onClick={handleLogout}
        className={css.logout}
        disabled={isLoggingOut}
      >
        <LogOut size={20} className={css.iconLogout} />
        Log out
      </button>
    </div>
  );
}
