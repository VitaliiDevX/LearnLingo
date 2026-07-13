export interface User {
  _id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  favorite_teachers: string[];
}
