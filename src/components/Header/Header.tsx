import clsx from "clsx";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import css from "./Header.module.css";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import AuthBarSkeleton from "../AuthBarSkeleton/AuthBarSkeleton";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import Modal from "../Modal/Modal";
import ModalForm from "../ModalForm/ModalForm";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useAuthStore } from "../../store/useAuthStore";
import type { LoginValues, RegisterValues } from "../../types/auth";
import { FORMS_CONFIG, type FormType } from "../../constants/forms";
import { useAuth } from "../../lib/hooks/useAuth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const [modalType, setModalType] = useState<FormType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isInitializing = useAuthStore((state) => state.isInitializing);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { login, isLoggingIn, register, isRegistering } = useAuth();

  const isLoading = isLoggingIn || isRegistering;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeModal = () => setModalType(null);

  const handleAuthSubmit = async (data: FieldValues) => {
    if (modalType === "login") {
      login(data as LoginValues, { onSuccess: closeModal });
    } else if (modalType === "register") {
      register(data as RegisterValues, { onSuccess: closeModal });
    }
  };

  const config = modalType ? FORMS_CONFIG[modalType] : null;

  return (
    <header className={clsx(css.header, isScrolled && css.headerScrolled)}>
      <div className={clsx(css.headerContent, "container")}>
        <Logo />

        <div className={css.navLinks}>
          <NavLinks />
        </div>

        <div className={css.buttonWrapper}>
          <ThemeSelector />
          <div className={css.authButtons}>
            {isInitializing ? (
              <AuthBarSkeleton />
            ) : isAuthenticated ? (
              <UserBar />
            ) : (
              <AuthBar
                onLoginClick={() => setModalType("login")}
                onRegisterClick={() => setModalType("register")}
              />
            )}
          </div>
          <div className={css.mobileBurger}>
            <BurgerMenu onOpenModal={(type) => setModalType(type)} />
          </div>
        </div>
      </div>
      <Modal isOpen={!!config} onClose={closeModal}>
        {config && (
          <ModalForm
            {...config}
            isLoading={isLoading}
            onSubmit={handleAuthSubmit}
          >
            {modalType === "login" ? <LoginForm /> : <RegisterForm />}
          </ModalForm>
        )}
      </Modal>
    </header>
  );
}
