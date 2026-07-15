import { useQuery } from "@tanstack/react-query";
import { getLanguages, getPrices } from "../services/filters";
import { ALL_OPTION, LEVELS_OPTIONS } from "../../constants/filters";

export const useLanguageOptions = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
    select: (data) => [
      ALL_OPTION,
      ...data.map((lang) => ({ value: lang.name, label: lang.name })),
    ],
    staleTime: Infinity,
  });
};

export const useLevelOptions = () => {
  return useQuery({
    queryKey: ["levels"],
    queryFn: () => Promise.resolve([ALL_OPTION, ...LEVELS_OPTIONS]),
    staleTime: Infinity,
  });
};

export const usePriceOptions = () => {
  return useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
    select: (data) => [
      ALL_OPTION,
      ...data.map((price) => ({
        value: String(price.value),
        label: `${price.value} $`,
      })),
    ],
    staleTime: 1000 * 60 * 60,
  });
};
