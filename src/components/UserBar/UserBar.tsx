import { Heart, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import css from "./UserBar.module.css";
import Avatar from "../Avatar/Avatar";
import { NavLink } from "react-router";
import clsx from "clsx";
import { useAuth } from "../../lib/hooks/useAuth";

export default function UserBar() {
  const user = useAuthStore((state) => state.user);

  const { logout, isLoggingOut } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={css.wrapper}>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          clsx(css.favButton, isActive && css.active)
        }
        title="Favorite teachers"
      >
        <Heart size={24} className={css.iconHeart} />
      </NavLink>
      {user && <Avatar size={48} name={user.name} />}
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
