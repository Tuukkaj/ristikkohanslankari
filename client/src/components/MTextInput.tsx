import { FormEvent } from "react";

interface MInputProps {
  title: string;
  value: string | number | null;
  id: string;
  placeholder: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function (props: MInputProps) {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font mb-2"
        htmlFor={props.id}
      >
        {props.title}{" "}
        {props.required && <span className="text-emerald-700">*</span>}
      </label>
      <input
        id={props.id}
        type="text"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={props.onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-7001 invalid:required:focus:border-emerald-700 leading-tight focus:outline-none focus:shadow-outline"
        required={props.required || false}
      />
    </div>
  );
}
