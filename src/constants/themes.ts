export interface ThemePalette {
  id: string;
  name: string;
  primary: string;
  hover: string;
  emphasis: string;
  laptopStart: string;
  laptopEnd: string;
}

export const THEMES: ThemePalette[] = [
  {
    id: "yellow",
    name: "Classic Yellow",
    primary: "#f4c550",
    hover: "#ffdc86",
    emphasis: "#fbe9ba",
    laptopStart: "#eeb055",
    laptopEnd: "#d08f38",
  },
  {
    id: "sage-green",
    name: "Sage Green",
    primary: "#9fbaae",
    hover: "#b7d1c6",
    emphasis: "#cbded3",
    laptopStart: "#295761",
    laptopEnd: "#183e49",
  },
  {
    id: "steel-blue",
    name: "Steel Blue",
    primary: "#9fb7ce",
    hover: "#b7cee4",
    emphasis: "#bfd6ea",
    laptopStart: "#314b6e",
    laptopEnd: "#1f385a",
  },
  {
    id: "dusty-rose",
    name: "Dusty Rose",
    primary: "#e0a39a",
    hover: "#f5bbb2",
    emphasis: "#f2c0bd",
    laptopStart: "#b03f3e",
    laptopEnd: "#982a27",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    primary: "#f0aa8d",
    hover: "#ffc3ab",
    emphasis: "#f4c8ba",
    laptopStart: "#e17650",
    laptopEnd: "#ca5b38",
  },
  {
    id: "lavender",
    name: "Lavender Mist",
    primary: "#b8a3e0",
    hover: "#d1c4f5",
    emphasis: "#c5b9e8",
    laptopStart: "#5a4a8c",
    laptopEnd: "#453675",
  },
  {
    id: "soft-teal",
    name: "Soft Teal",
    primary: "#85c4c9",
    hover: "#a1d7db",
    emphasis: "#b3e2e5",
    laptopStart: "#2a6a6f",
    laptopEnd: "#1d5257",
  },
  {
    id: "warm-sand",
    name: "Warm Sand",
    primary: "#d6c29b",
    hover: "#e8d6b2",
    emphasis: "#f0e1c2",
    laptopStart: "#8b6e45",
    laptopEnd: "#6e5533",
  },
  {
    id: "muted-plum",
    name: "Muted Plum",
    primary: "#c89eb2",
    hover: "#e0b8cb",
    emphasis: "#e8c9d8",
    laptopStart: "#7a4860",
    laptopEnd: "#5f364a",
  },
];
