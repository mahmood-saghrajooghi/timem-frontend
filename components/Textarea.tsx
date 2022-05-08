import React, { useMemo } from "react";
import {
  themeBgColorClassNames,
  themeTextColorClassNames,
  ThemeComponentColor,
  ThemeVariant,
} from "../utils/theme-utils";

type TextareaSize = "xs" | "sm" | "md";

const sizeClassNames: Record<TextareaSize, string> = {
  md: "px-4 py-2 text-sm",
  sm: "px-2 py-1 text-xs",
  xs: "px-2 py-1 text-xxs leading-3",
};

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  color?: ThemeComponentColor;
  variant?: ThemeVariant;
  cSize?: TextareaSize;
}

export const Textarea: React.FC<TextareaProps> = ({
  color = "gray",
  variant = "dark",
  cSize = "md",
  className,
  ...props
}) => {
  const colors: { bg: string; text: string } = useMemo(
    () => ({
      bg:
        themeBgColorClassNames[color][variant]["base"] +
          " " +
          themeBgColorClassNames[color][variant]["focus"] ?? "",
      text: themeTextColorClassNames[color][variant],
    }),
    [color, color]
  );
  return (
    <textarea
      className={`inline-block w-auto tracking-wide font-medium text-white outline-0 ${
        colors.bg
      } ${sizeClassNames[cSize]} ${colors.text} ${
        variant === "lighter" ? "font-bold" : ""
      } ${className}`}
      {...props}
    ></textarea>
  );
};
