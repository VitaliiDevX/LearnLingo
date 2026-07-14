export interface ModalConfig {
  title: string;
  description: string;
}

export const MODAL_TEXTS = {
  authRequired: {
    title: "Authentication Required",
    description:
      "To add a teacher to favorites, you need to be a registered user.",
  },
  confirmLogout: {
    title: "Confirm Logout",
    description: "Are you sure you want to log out of your account?",
  },
} as const;

export type ModalType = keyof typeof MODAL_TEXTS;
