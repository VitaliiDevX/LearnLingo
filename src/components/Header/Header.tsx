import clsx from "clsx";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";
import InputField from "../InputField/InputField";
import { AUTH_CONFIG } from "../../constants/auth";

export default function Header() {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const closeModal = () => setModalType(null);

  const config = modalType ? AUTH_CONFIG[modalType] : null;

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

      {config && (
        <Modal onClose={closeModal}>
          <AuthForm
            title={config.title}
            description={config.description}
            buttonText={config.button}
            schema={config.schema}
            onSubmit={() => {}}
          >
            {modalType === "register" && (
              <InputField name="name" placeholder="Name" />
            )}
            <InputField name="email" placeholder="Email" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
          </AuthForm>
        </Modal>
      )}
    </header>
  );
}
