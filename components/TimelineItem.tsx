import React from "react";
import Polygon from "icons/polygon.svg";
import { Label } from "./Label";
import dayjs from "dayjs";
import { SpacedChildren } from "./styled/SpacedChildren";
import { ThemeComponentColor } from "utils/theme-utils";
import { getTimeFromEstimateObj } from "hooks/customTimerUtils";
import { renderEstimate } from "utils/render-estimate";

interface TimelineItemProps {
  title: string;
  desc: string;
  completed: Date;
  color: ThemeComponentColor;
  estimate: { h: number; m: number; s: number };
  doneIn: { h: number; m: number; s: number };
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  desc,
  completed,
  color = "gray",
  estimate,
  doneIn,
}) => {
  return (
    <div className="relative w-full flex">
      {/* left */}
      <div className="relative w-[23px] flex flex-col items-center">
        <div className="relative">
          <Polygon width={23} className={`text-timem-${color}-100`} />
          <Polygon
            width={15}
            className={`text-timem-${color}-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
          />
        </div>
        <div className={`bg-timem-${color}-100 -mt-1 w-[5px] flex-1`}></div>
      </div>
      <div className="ml-2 pt-[2px] flex-1">
        <Label color={color} size="xs" className="h-[16px] py-0 mb-1">
          {dayjs(completed).format("YYYY MMM DD")}
        </Label>
        <SpacedChildren
          spaceDirection="bottom"
          childSpace=".25rem"
          className={`bg-timem-${color}-100 p-2 text-xs font-medium mb-3`}
        >
          {/* header */}
          <div>{title}</div>
          <div
            className={`w-full border-b border-dashed border-timem-${color}-500`}
          ></div>
          {/* content */}
          <div>{desc}</div>
        </SpacedChildren>
      </div>
      {/* right */}
    </div>
  );
};

/**
  colors:

  "text-timem-red-100"
  "text-timem-green-100"
  "text-timem-primary-100"
  "text-timem-blue-100"
  "text-timem-secondary-100"
  "border-timem-red-500"
  "border-timem-green-500"
  "border-timem-primary-500"
  "border-timem-blue-500"
  "border-timem-secondary-500"

 */
