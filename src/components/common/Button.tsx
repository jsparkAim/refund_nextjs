"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  style,
}) => {
  const baseStyle =
    "rounded-xl px-4 py-2 text-sm font-medium focus:outline-none transition";

  const variantClasses = {
    primary: "bg-[var(--color-main)] text-white hover:bg-[var(--color-sub1)]",
    secondary: "bg-[var(--color-sub2)] text-white hover:bg-[var(--color-sub3)]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyle,
        variantClasses[variant],
        disabled ? disabledStyle : "",
        className
      )}
      style={style}>
      {children}
    </button>
  );
};
