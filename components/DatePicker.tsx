import React from "react";
import styled from "@emotion/styled";
import { DatePicker as DatePickerCmp } from "@mantine/dates";
import themeColors from "../theme-colors.config";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { DateDiff, getDateDiffString } from "utils/date-dift";
import { Label } from "./Label";
import { useState } from "react";
import { ThemeComponentColor, ThemeVariant } from "utils/theme-utils";

const DatePickerWrapper = styled.div`
    & > .mantine-DatePicker-root {
        position: relative;
        z-index: 1;
        opacity: 0;

        label {
          display: none;
        }

        .mantine-DatePicker-rightSection {
          width: 20px;
        }

        .mantine-ActionIcon-root {
          color: white;        

          svg {
            width: 13px;
            heights: 13px;
          }
        }

        .mantine-DatePicker-wrapper {
          
          input {
            display: inline-block;
            // cursor: default;
            color: white;
            background: ${themeColors["timem-gray"]["900"]};
            padding: .25rem .5rem;
            line-height: .75rem;
            height: auto;
            min-height: auto;
            letter-spacing: .14em;
            font-size: 9px;
            font-weight: bold;
            border-radius: 0px;
            outline: 0 !important;
            border: 0;

            ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
              color: white;
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color: white;
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
              color: white;
            }
            :-ms-input-placeholder { /* Internet Explorer 10-11 */
              color: white;
            }
            ::-ms-input-placeholder { /* Microsoft Edge */
              color: white;
            }
            ::placeholder { /* Most modern browsers support this now. */
              color: white;
            }
          
          }
        }
      }
    }
  `;

interface DatePickerProps extends React.ComponentProps<typeof DatePickerCmp> {
  labelColor?: ThemeComponentColor;
  labelVariant?: ThemeVariant;
}
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ labelColor = "dark", labelVariant = "dark", ...props }, ref) => {
    const [diff, setDiffOrg] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const setDiff = useCallback(
      (str: string | undefined) => {
        const dff = `Deadline: ${str}`;
        setDiffOrg(dff);
        inputRef.current.size = dff.length * 1.14 + 2.5;
      },
      [inputRef?.current]
    );
    useEffect(() => {
      setDiff(getDateDiffString(new Date(), props.value));
    }, []);
    return (
      <DatePickerWrapper>
        <Label
          color={labelColor}
          variant={labelVariant}
          size="xs"
          className="absolute whitespace-nowrap"
        >
          {diff}
        </Label>
        <DatePickerCmp
          ref={inputRef}
          {...props}
          onChange={(v) => {
            setDiff(getDateDiffString(new Date(), v));
            props?.onChange && props.onChange(v);
          }}
        />
      </DatePickerWrapper>
    );
  }
);
