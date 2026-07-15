import {
  useLanguageOptions,
  usePriceOptions,
  useLevelOptions,
} from "../../lib/hooks/useFilters";
import css from "./SearchBox.module.css";
import type { FilterState, FilterUpdate } from "../../types/filters";
import SelectField from "../SelectField/SelectField";

interface Props {
  filters: FilterState;
  onChange: (newFilters: FilterUpdate) => void;
}

export default function SearchBox({ filters, onChange }: Props) {
  const {
    data: languages = [],
    isLoading: langLoading,
    isError: langError,
  } = useLanguageOptions();
  const {
    data: prices = [],
    isLoading: priceLoading,
    isError: priceError,
  } = usePriceOptions();
  const {
    data: levels = [],
    isLoading: levelLoading,
    isError: levelError,
  } = useLevelOptions();

  const isAnyLoading = langLoading || priceLoading || levelLoading;

  return (
    <div className={css.searchBox}>
      <SelectField
        label="Languages"
        placeholder={
          isAnyLoading ? "Loading..." : langError ? "Unavailable" : "All"
        }
        options={languages}
        value={filters.language}
        onChange={(val) => onChange({ language: val })}
        disabled={isAnyLoading || langError}
        width="220px"
      />

      <SelectField
        label="Level"
        placeholder={
          isAnyLoading ? "Loading..." : levelError ? "Unavailable" : "All"
        }
        options={levels}
        value={filters.level}
        onChange={(val) => onChange({ level: val })}
        disabled={isAnyLoading || levelError}
        width="198px"
      />

      <SelectField
        label="Price"
        placeholder={
          isAnyLoading ? "Loading..." : priceError ? "Unavailable" : "All"
        }
        options={prices}
        value={filters.price}
        onChange={(val) => onChange({ price: val })}
        disabled={isAnyLoading || priceError}
        width="124px"
      />
    </div>
  );
}
