import * as Select from "@radix-ui/react-select";
import css from "./SelectField.module.css";
import Icon from "../Icon/Icon";

interface Props {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  disabled?: boolean;
}

export default function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
  width,
  disabled,
}: Props) {
  return (
    <div
      className={css.wrapper}
      style={{ "--field-width": width } as React.CSSProperties}
    >
      <Select.Root
        value={value || ""}
        onValueChange={onChange}
        disabled={disabled}
      >
        <label className={css.labelWrapper}>
          <span className={css.labelText}>{label}</span>
          <Select.Trigger className={css.trigger}>
            <Select.Value placeholder={placeholder} />
            <Select.Icon className={css.iconContainer}>
              <Icon id="icon-chevron" className={css.icon} />
            </Select.Icon>
          </Select.Trigger>
        </label>

        <Select.Portal>
          <Select.Content
            className={css.content}
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport>
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={css.item}
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
