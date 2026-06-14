const AVATAR_PALETTE = [
  { bg: "#FDF2F2", text: "#E53E3E" },
  { bg: "#F0FFF4", text: "#38A169" },
  { bg: "#EBF8FF", text: "#3182CE" },
  { bg: "#FAF5FF", text: "#805AD5" },
  { bg: "#ffffcd", text: "#D69E2E" },
];

export const getInitials = (name: string) => {
  if (!name) return "U";

  const parts = name.split(" ");

  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return name[0].toUpperCase();
};

export const getAvatarColors = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
};
