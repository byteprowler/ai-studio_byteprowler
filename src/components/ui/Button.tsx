import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-neon-lime text-black shadow-glow-lime/10 hover:bg-[#bbf000] hover:shadow-glow-lime/25",
  secondary: "border-neon-lime/30 bg-black/75 text-neon-lime hover:border-neon-lime/55 hover:bg-neon-lime/10",
  ghost: "border-white/10 bg-black/45 text-gray-200 hover:border-neon-blue/35 hover:bg-neon-blue/10 hover:text-neon-blue",
  danger: "border-red-500/40 bg-red-950/30 text-red-200 hover:border-red-400 hover:bg-red-500/15",
};

export default function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`terminal-button ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
