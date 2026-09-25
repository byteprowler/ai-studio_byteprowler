import React from "react";
import FormField from "./FormField";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  containerClassName?: string;
}

export default function Textarea({
  id,
  label,
  required,
  error,
  helperText,
  containerClassName,
  className = "",
  ...props
}: TextareaProps) {
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
        <textarea
          id={fieldId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={`terminal-textarea ${invalid ? "terminal-control-error" : ""} ${className}`}
          {...props}
        />
      )}
    </FormField>
  );
}
