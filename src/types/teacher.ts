export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  _id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export interface PaginatedTeachers {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  teachers: Teacher[];
}

export interface GetTeachersParams {
  page?: number;
  perPage?: number;
  language?: string;
  level?: string;
  price?: number;
}

export interface GetFavoritesParams {
  page?: number;
  perPage?: number;
}

export interface FavoriteActionResponse {
  message: string;
}

export interface FavoriteActionParams {
  teacherId: string;
}
