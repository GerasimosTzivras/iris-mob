import clsx from "clsx";

function PageSizesSelect({ value, onChange, options }) {
  return (
    <div>
      <select
        className={clsx("form-select", "form-select-sm")}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSizesSelect;
