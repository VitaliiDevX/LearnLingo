export interface Language {
  _id: string;
  name: string;
}

export interface Price {
  _id: string;
  value: number;
}

export interface FilterState {
  language: string;
  level: string;
  price: string;
}

export type FilterUpdate = Partial<FilterState>;
