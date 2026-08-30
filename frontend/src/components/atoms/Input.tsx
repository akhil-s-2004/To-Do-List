import type {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  ...props
}: InputProps) {
  return (
    <label className="input-wrapper">
      {label && (
        <span className="input-label">
          {label}
        </span>
      )}

      <input {...props} />
    </label>
  );
}