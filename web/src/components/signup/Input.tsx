import { ChangeEventHandler } from "react";

interface Props {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLElement>;
}

export default function Input({ type, label, value, name, onChange }: Props) {
  return (
    <>
      <div>
        <h3 className="text-center mb-4 text-sm font-light">{label}</h3>
        <input
          value={value}
          type={type}
          onChange={onChange}
          name={name}
          required
          className="outline-none shadow-lg bg-minim-gray-a pl-6 text-sm font-light rounded-sm h-11 w-60"
        />
      </div>
    </>
  );
}
