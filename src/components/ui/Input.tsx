import React from "react";
import FormField from "./FormField";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  containerClassName?: string;
}

export default function Input({
  id,
  label,
  required,
  error,
  helperText,
  containerClassName,
  className = "",
  ...props
}: InputProps) {
  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      className={containerClassName}
    >
      {({ fieldId, describedBy, invalid }) => (
        <input
          id={fieldId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={`terminal-input ${invalid ? "terminal-control-error" : ""} ${className}`}
          {...props}
        />
      )}
    </FormField>
  );
}
