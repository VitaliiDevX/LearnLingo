import clsx from "clsx";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import { useState } from "react";
import Modal from "../Modal/Modal";

export default function Header() {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const closeModal = () => setModalType(null);

  return (
    <header className={css.header}>
      <div className={clsx(css.headerContent)}>
        <Logo />

        <NavLinks />

        <div className={css.authButtons}>
          <ThemeSelector />
          <AuthBar
            onLoginClick={() => setModalType("login")}
            onRegisterClick={() => setModalType("register")}
          />
        </div>
      </div>

      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "login" ? <p>login</p> : <p>register</p>}
          {/* {modalType === "login" ? <LoginForm /> : <RegisterForm />} */}
        </Modal>
      )}
    </header>
  );
}
