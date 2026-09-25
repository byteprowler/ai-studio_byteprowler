import React from "react";
import FormField from "./FormField";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  containerClassName?: string;
}

export default function Select({
  id,
  label,
  required,
  error,
  helperText,
  containerClassName,
  className = "",
  children,
  ...props
}: SelectProps) {
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
        <select
          id={fieldId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={`terminal-select ${invalid ? "terminal-control-error" : ""} ${className}`}
          {...props}
        >
          {children}
        </select>
      )}
    </FormField>
  );
}
