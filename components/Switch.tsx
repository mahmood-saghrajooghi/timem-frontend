import React from "react";
import styled from "@emotion/styled";
import { Switch as SwitchCmp } from "@mantine/core";
import themeColors from "../theme-colors.config";
import { ThemeComponentColor, ThemeVariant } from "utils/theme-utils";

const SwitchWrapper = styled.div`
  margin-bottom: -2px;

  & .mantine-Switch-input {
    border-radius: 0;
    height: 16px;
    width: 30px;
    min-width: 30px;

    &::before {
      border-radius: 0;
      width: 12px;
      height: 12px;
      transform: translateX(1px);
      border-color: ${themeColors["timem-gray"][100]};
    }

    &:checked {
      border-color: ${({
        color,
      }: {
        color?: ThemeComponentColor;
        variant?: ThemeVariant;
      }) => themeColors[`timem-${color}`][100]};
      background-color: ${({ color }) => themeColors[`timem-${color}`][900]};

      &::before {
        border-color: ${({ color }) => themeColors[`timem-${color}`][900]};
        transform: translateX(15px);
      }
    }
  }
`;

interface DatePickerProps extends React.ComponentProps<typeof SwitchCmp> {
  color?: ThemeComponentColor;
  variant?: ThemeVariant;
}
export const Switch = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ color = "dark", variant = "dark", ...props }, ref) => {
    return (
      <SwitchWrapper color={color} variant={variant}>
        <SwitchCmp ref={ref} {...props} />
      </SwitchWrapper>
    );
  }
);
