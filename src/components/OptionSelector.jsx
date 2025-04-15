import React from "react";
export default function OptionSelector({
  label,
  type,
  name,
  options = [],
  selected,
  onChange,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (type === "checkbox") {
      const isChecked = e.target.checked;
      onChange(
        isChecked
          ? [...selected, value]
          : selected.filter((item) => item !== value)
      );
    } else {
      onChange(value);
    }
  };

  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-2 px-3 py-1 rounded border cursor-pointer ${
              selected?.includes?.(option) || selected === option
                ? "bg-red-100 border-red-500"
                : "border-gray-300"
            }`}
          >
            <input
              type={type}
              name={name}
              value={option}
              checked={
                type === "radio"
                  ? selected === option
                  : selected.includes(option)
              }
              onChange={handleChange}
              className="accent-red-500"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
