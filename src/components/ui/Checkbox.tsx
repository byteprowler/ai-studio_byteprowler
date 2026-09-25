import React, { useId } from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  containerClassName?: string;
}

export default function Checkbox({
  id,
  label,
  error,
  helperText,
  containerClassName = "",
  className = "",
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`terminal-field ${containerClassName}`}>
      <label htmlFor={fieldId} className="terminal-checkbox-label">
        <input
          id={fieldId}
          type="checkbox"
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={`terminal-checkbox ${className}`}
          {...props}
        />
        <span className="terminal-checkbox-copy">{label}</span>
      </label>

      {helperText && (
        <p id={helperId} className="terminal-helper pl-7">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="terminal-error pl-7" role="alert">
          <span aria-hidden="true">[ERROR]</span> {error}
        </p>
      )}
    </div>
  );
}
