import React, { useMemo } from "react";
import {
  themeBgColorClassNames,
  themeTextColorClassNames,
  ThemeComponentColor,
  ThemeVariant,
} from "../utils/theme-utils";

type ButtonSize = "xs" | "sm" | "md";

const sizeClassNames: Record<ButtonSize, string> = {
  md: "px-4 py-2 text-sm",
  sm: "px-2 py-1 text-xs",
  xs: "px-2 py-1 text-xxs font-bold leading-3",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ThemeComponentColor;
  size?: ButtonSize;
  variant?: ThemeVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    color = "gray",
    variant = "dark",
    size = "md",
    children,
    className,
    type="button",
    ...props
  },ref) => {
    const colors: { bg: string; text: string } = useMemo(
      () => ({
        bg:
          themeBgColorClassNames[color][variant]["base"] +
          " " +
          themeBgColorClassNames[color][variant]["hover"],
        text: themeTextColorClassNames[color][variant],
      }),
      [color, variant]
    );
    return (
      <button
        className={`inline-flex items-center tracking-wide font-medium ${colors.bg} ${sizeClassNames[size]} ${colors.text} ${className}`}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

/**
  blue: {
    dark: {
      base: "bg-timem-blue-900",
      hover: "bg-timem-blue-900",
    },
    light: {
      base: "bg-timem-blue-100",
      hover: " hover:bg-timem-blue-200 active:bg-timem-blue-300",
    },
    lighter: {
      base: "bg-timem-blue-50",
      hover: "hover:bg-timem-blue-100 active:bg-timem-blue-200",
    },
  },
  yellow: {
    dark: {
      base: "bg-timem-yellow-900",
      hover: "bg-timem-yellow-900",
    },
    light: {
      base: "bg-timem-yellow-100",
      hover: "hover:bg-timem-yellow-200 active:bg-timem-yellow-300",
    },
    lighter: {
      base: "bg-timem-yellow-50",
      hover: "hover:bg-timem-yellow-100 active:bg-timem-yellow-200",
    },
  },
  primary: {
    dark: {
      base: "bg-timem-primary-900",
      hover: "bg-timem-primary-900",
    },
    light: {
      base: "bg-timem-primary-100",
      hover: "hover:bg-timem-primary-200 active:bg-timem-primary-300",
    },
    lighter: {
      base: "bg-timem-primary-50",
      hover: "hover:bg-timem-primary-100 active:bg-timem-primary-200",
    },
  },
  secondary: {
    dark: {
      base: "bg-timem-secondary-900",
      hover: "bg-timem-secondary-900",
    },
    light: {
      base: "bg-timem-secondary-100",
      hover: "hover:bg-timem-secondary-200 active:bg-timem-secondary-300",
    },
    lighter: {
      base: "bg-timem-secondary-50",
      hover: "hover:bg-timem-secondary-100 active:bg-timem-secondary-200",
    },
  },
  green: {
    dark: {
      base: "bg-timem-green-900",
      hover: "bg-timem-green-900",
    },
    light: {
      base: "bg-timem-green-100",
      hover: "hover:bg-timem-green-200 active:bg-timem-green-300",
    },
    lighter: {
      base: "bg-timem-green-50",
      hover: "hover:bg-timem-green-100 active:bg-timem-green-200",
    },
  },
  red: {
    dark: {
      base: "bg-timem-red-900",
      hover: "bg-timem-red-900",
    },
    light: {
      base: "bg-timem-red-100",
      hover: "hover:bg-timem-red-200 active:bg-timem-red-300",
    },
    lighter: {
      base: "bg-timem-red-50",
      hover: "hover:bg-timem-red-100 active:bg-timem-red-200",
    },
  },
  gray: {
    dark: {
      base: "bg-timem-gray-900",
      hover: "bg-timem-gray-900",
    },
    light: {
      base: "bg-timem-gray-100",
      hover: "hover:bg-timem-gray-200 active:bg-timem-gray-300",
    },
    lighter: {
      base: "bg-timem-gray-50",
      hover: "hover:bg-timem-gray-100 active:bg-timem-gray-200",
    },
  },
  "light-gray": {
    dark: {
      base: "bg-timem-light-gray-900",
      hover: "bg-timem-light-gray-900 border",
      focus: "border bg-timem-light-gray-900 focus:border-timem-gray-900",
    },
    light: {
      base: "bg-timem-light-gray-100",
      hover: "hover:bg-timem-gray-50 active:bg-timem-gray-100",
      focus: "focus:border-timem-gray-900",
    },
    lighter: {
      base: "bg-timem-light-gray-50",
      hover: "hover:bg-timem-light-gray-100 active:bg-timem-light-gray-200",
      focus: "focus:border-timem-gray-900",
    },
  },
  "white-outline": {
    dark: {
      base: "bg-white border border-timem-gray-100",
      hover: " hover:border-timem-gray-700",
      focus: "focus:border-timem-gray-900",
    },
    light: {
      base: "bg-white",
      hover: "border border-timem-gray-100 hover:border-timem-gray-700",
      focus: "focus:border-timem-gray-900",
    },
    lighter: {
      base: "bg-timem-gray-50",
      hover: "hover:bg-timem-gray-100 active:bg-timem-gray-200",
      focus: "focus:border-timem-gray-900",
    },
  },
  dark: {
    dark: {
      base: "bg-timem-gray-900",
      hover: "bg-timem-gray-900",
    },
    light: { base: "bg-timem-gray-900", hover: "bg-timem-gray-900" },
    lighter: { base: "bg-timem-gray-900", hover: "bg-timem-gray-900" },
  },
  white: {
    dark: {
      base: "bg-white",
      hover: "hover:bg-timem-light-gray-400",
    },
    light: { base: "bg-white", hover: "hover:bg-timem-light-gray-400" },
    lighter: { base: "bg-white", hover: "hover:bg-timem-light-gray-400" },
  },



  blue: {
    dark: "text-white",
    light: `text-timem-blue-900`,
    lighter: `text-timem-blue-900`,
  },
  yellow: {
    dark: "text-white",
    light: `text-timem-yellow-900`,
    lighter: `text-timem-yellow-900`,
  },
  primary: {
    dark: "text-white",
    light: `text-timem-primary-900`,
    lighter: `text-timem-primary-900`,
  },
  secondary: {
    dark: "text-white",
    light: `text-timem-secondary-900`,
    lighter: `text-timem-secondary-900`,
  },
  green: {
    dark: "text-white",
    light: `text-timem-green-900`,
    lighter: `text-timem-green-900`,
  },
  red: {
    dark: "text-white",
    light: `text-timem-red-900`,
    lighter: `text-timem-red-900`,
  },
  gray: {
    dark: "text-white",
    light: `text-timem-gray-900`,
    lighter: `text-timem-gray-900`,
  },
  "light-gray": {
    dark: "text-timem-gray-900",
    light: "text-timem-gray-900",
    lighter: "text-timem-gray-900",
  },
  "white-outline": {
    dark: "text-timem-gray-900",
    light: "text-timem-gray-900",
    lighter: "text-timem-gray-900",
  },
  "input-outline": {
    dark: "text-timem-gray-900",
    light: "text-timem-gray-900",
    lighter: "text-timem-gray-900",
  },
  dark: {
    dark: "text-white",
    light: "text-white",
    lighter: "text-white",
  },
  white: {
    dark: "text-timem-gray-900",
    light: "text-timem-gray-900",
    lighter: "text-timem-gray-900",
  },
 */
