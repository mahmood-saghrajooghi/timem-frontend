import React, { useMemo } from "react";
import {
  themeBgColorClassNames,
  themeTextColorClassNames,
  ThemeComponentColor,
  ThemeVariant,
} from "../utils/theme-utils";

type LabelSize = "xs" | "sm" | "md";

const sizeClassNames: Record<LabelSize, string> = {
  md: "px-4 py-2 text-sm font-medium ",
  sm: "px-2 py-1 text-xs font-medium ",
  xs: "px-2 py-1 text-xxs font-bold leading-3",
};

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ThemeComponentColor;
  variant?: ThemeVariant;
  size?: LabelSize;
}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  (
    {
      color = "gray",
      variant = "dark",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const colors: { bg: string; text: string } = useMemo(
      () => ({
        bg: themeBgColorClassNames[color][variant]["base"],
        text: themeTextColorClassNames[color][variant],
      }),
      [color, color]
    );
    return (
      <div
        className={`inline-flex items-center cursor-default tracking-wide ${
          colors.bg
        } ${sizeClassNames[size]} ${colors.text} ${
          variant === "lighter" ? "font-bold" : ""
        } ${className ?? ''}`}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
