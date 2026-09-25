import React, { useId } from "react";

interface FormFieldRenderProps {
  fieldId: string;
  describedBy?: string;
  invalid: boolean;
}

interface FormFieldProps {
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
  error?: string;
  helperText?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  children: (props: FormFieldRenderProps) => React.ReactNode;
}

export default function FormField({
  id,
  label,
  required = false,
  error,
  helperText,
  className = "",
  labelClassName = "",
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`terminal-field ${className}`}>
      {label && (
        <label htmlFor={fieldId} className={`terminal-label ${labelClassName}`}>
          <span>{label}</span>
          {required && (
            <span className="terminal-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children({ fieldId, describedBy, invalid: !!error })}

      {helperText && (
        <p id={helperId} className="terminal-helper">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="terminal-error" role="alert">
          <span aria-hidden="true">[ERROR]</span> {error}
        </p>
      )}
    </div>
  );
}
