import React, { useMemo } from "react";
import {
  themeBgColorClassNames,
  themeTextColorClassNames,
  ThemeComponentColor,
  ThemeVariant,
} from "../utils/theme-utils";
import { SpacedChildren } from "./styled/SpacedChildren";

type InputSize = "xs" | "sm" | "md";

const sizeClassNames: Record<InputSize, string> = {
  md: "px-4 py-2 text-sm",
  sm: "px-2 py-1 text-xs",
  xs: "px-2 py-1 text-xxs leading-3",
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: ThemeComponentColor;
  variant?: ThemeVariant;
  cSize?: InputSize;
  error?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      color = "gray",
      variant = "dark",
      cSize = "md",
      error,
      className,
      ...props
    },
    ref
  ) => {
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
      <SpacedChildren spaceDirection="bottom" childSpace=".25rem" className="flex flex-col w-full">
        <input
          className={`inline-block w-auto tracking-wide font-medium outline-0 flex-1 ${
            colors.bg
          } ${sizeClassNames[cSize]} ${colors.text} ${
            variant === "lighter" ? "font-bold" : ""
          } ${error ? "border-timem-red-900" : ""} ${
            className ? className : ""
          }`}
          {...props}
          ref={ref}
        />
        {error ? <div className="text-timem-red-900">{error}</div> : null}
      </SpacedChildren>
    );
  }
);
