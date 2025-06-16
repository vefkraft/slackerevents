"use client";

import type { ButtonProps } from "../../../types";
import React from "react";

const baseStyle =
  "px-3 py-1 rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-400 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => (
  <button
    className={`${baseStyle} ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
