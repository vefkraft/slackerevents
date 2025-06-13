import React from "react";
import type { ButtonProps } from "../../../types";

/**
 * Universal Button component.
 * Supports variants and all native button props.
 */

  // Add more basestyle if needed.
const baseStyle =
  "px-3 py-1 rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variants for different button styles (remember to add variant in types after creating)
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-400 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button
    className={`${baseStyle} ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;