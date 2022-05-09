import { css } from "@emotion/react";
import dayjs from "dayjs";
import React, { useCallback, useRef, useState } from "react";
import { EstimateType, TaskStatus, TaskType } from "../types/TaskTypes";
import { Label } from "./Label";
import Play from "../icons/play.svg";
import Pause from "../icons/pause.svg";
import Check from "../icons/check.svg";
import Close from "../icons/close.svg";
import Delete from "../icons/delete.svg";
import ChevronDown from "../icons/chevron-down.svg";
import { SpacedChildren } from "./styled/SpacedChildren";
import { Button } from "./Button";
import { Input } from "./Input";
import OutsideClickHandler from "react-outside-click-handler";
import { useCustomTimer } from "../hooks/useCustomTimer";
import { DatePicker } from "./DatePicker";
import { getDateDiffString } from "utils/date-dift";
import { useEffect } from "react";

export const taskColors: Record<TaskStatus, string> = {
  DOING: "border-l-timem-blue-900",
  TODO: "border-l-timem-yellow-900",
  DONE: "border-l-timem-green-900",
  FAILED: "border-l-timem-red-900",
};

const iconButtonCss = css({
  padding: 0,
  width: 20,
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

interface TaskProps {
  status: TaskStatus;
  title: string;
  desc: string;
  estimate: { h: number; m: number; s: number };
  deadline: Date;
  completed: Date;
  created: Date;
  isPlaying?: boolean;
  showDetails?: boolean;
  updateEstimate?: (estimate: EstimateType) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onDone?: () => void;
  onUnDone?: () => void;
  onDelete?: () => void;
  onEdit?: (props: Partial<TaskType>) => void;
}

export const Task: React.FC<TaskProps> = ({
  status = "TODO",
  title,
  desc,
  estimate,
  deadline,
  completed,
  created,
  isPlaying = false,
  showDetails,
  onPause,
  onPlay,
  onDone,
  onUnDone,
  onEdit,
  updateEstimate,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(showDetails || false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    isEditing: isEditingTaskEstimate,
    start,
    pause,
    renderTime,
    inputProps,
    handleExitEditingMode,
    labelProps,
  } = useCustomTimer({
    expiryTimestamp: estimate,
    onEdit: (estimate) => {
      updateEstimate(estimate);
    },
    onExpire: onPause,
  });
  const [syncTaskDate, setSyncTaskDate] = useState<Date>(deadline);
  const descRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const toggleIsExpanded = useCallback(() => setIsExpanded((c) => !c), []);
  const handleDiscard = useCallback(() => {
    titleRef.current.innerText = title;
    descRef.current.innerText = desc;
    setIsEditing(false);
  }, [titleRef, descRef, title, desc]);
  const handleSave = useCallback(() => {
    onEdit({
      title: titleRef.current.innerText,
      desc: descRef.current.innerText,
    });
    setIsEditing(false);
  }, [titleRef, descRef]);

  useEffect(() => {
    if (isPlaying) {
      start();
    } else {
      pause();
    }
  }, [isPlaying]);

  return (
    <SpacedChildren
      spaceDirection="bottom"
      childSpace="0.5rem"
      className={`relative bg-white px-2 py-2 border-l-4 border border-timem-gray-100 ${taskColors[status]} `}
    >
      {/* content */}
      <SpacedChildren
        childSpace=".5rem"
        spaceDirection="right"
        className="flex pb-2 text-timem-gray-700 font-medium text-sm tracking-wide border-b border-dashed border-timem-gray-100"
      >
        {/* <Label size="xs" color="red">BUGFIX</Label> */}
        {/* <Label size="xs" color="yellow">TODO</Label> */}
        <div
          contentEditable
          className="outline-0 leading-5 flex-1"
          ref={titleRef}
          onInput={(e) => {
            setIsEditing(true);
          }}
          onKeyDown={(e) => {
            if (e.metaKey && e.code === "Enter") {
              handleSave();
              var p = titleRef.current,
                s = window.getSelection(),
                r = document.createRange();
              r.setStart(p, 1);
              r.setEnd(p, 1);
              s.removeAllRanges();
              s.addRange(r);
            }
            if (e.code === "Escape") {
              handleDiscard();
              var p = titleRef.current,
                s = window.getSelection(),
                r = document.createRange();
              r.setStart(p, 1);
              r.setEnd(p, 1);
              s.removeAllRanges();
              s.addRange(r);
            }
          }}
        >
          {title}
        </div>
        <SpacedChildren
          childSpace=".5rem"
          spaceDirection="right"
          className="flex items-center ml-auto"
        >
          {isEditingTaskEstimate ? (
            <OutsideClickHandler onOutsideClick={handleExitEditingMode}>
              <Input
                {...inputProps}
                color="white-outline"
                variant="dark"
                cSize="sm"
                autoFocus
                className="h-[20px] py-0 flex items-center"
              />
            </OutsideClickHandler>
          ) : (
            <Label
              {...labelProps}
              color="light-gray"
              variant="dark"
              size="sm"
              className="h-[20px] py-0 flex items-center"
            >
              {renderTime()}
            </Label>
          )}
          <Button
            onClick={toggleIsExpanded}
            color="light-gray"
            css={css([iconButtonCss, { width: 20, height: 20 }])}
          >
            <ChevronDown
              className="text-timem-gray-500"
              css={css({ transform: isExpanded ? "rotate(180deg)" : "" })}
              width={12}
            />
          </Button>
        </SpacedChildren>
      </SpacedChildren>
      <div
        contentEditable
        ref={descRef}
        onInput={() => setIsEditing(true)}
        className={`${
          isExpanded ? "" : "hidden"
        } pb-2 text-timem-gray-700 font-medium text-xs tracking-normal outline-0 border-b border-dashed border-timem-gray-100`}
      >
        {desc}
      </div>
      {/* footer */}
      <SpacedChildren
        childSpace=".5rem"
        spaceDirection="right"
        className="flex items-end"
      >
        {/* footer-left  */}
        <Label
          size="xs"
          className="whitespace-nowrap"
          color={!completed ? "blue" : "white-outline"}
        >
          Created:{" "}
          {getDateDiffString(
            new Date(),
            dayjs(new Date()).subtract(1, "days").toDate()
          )}
        </Label>
        {completed !== null ? (
          <Label size="xs" className="whitespace-nowrap" color="white-outline">
            Completed:{" "}
            {getDateDiffString(new Date(), dayjs(completed).toDate())}
          </Label>
        ) : null}

        <DatePicker
          minDate={dayjs(new Date()).add(1, "days").toDate()}
          value={syncTaskDate}
          onChange={(v) => {
            setSyncTaskDate(v);
            onEdit({ deadline: v });
          }}
          required
          labelColor={!completed ? "dark" : "white-outline"}
        />

        {/* footer-right */}
        <SpacedChildren
          childSpace=".25rem"
          spaceDirection="right"
          className="flex ml-auto text-timem-gray-900"
        >
          {isEditing && (
            <>
              <Button
                size="xs"
                color="white-outline"
                css={css({ height: 20, paddingTop: 0, paddingBottom: 0 })}
                onClick={handleDiscard}
              >
                Discard
              </Button>
              <Button
                size="xs"
                css={css({ height: 20, paddingTop: 0, paddingBottom: 0 })}
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          )}
          {!isEditing && status === "TODO" && (
            <Button
              onClick={onDelete}
              color="red"
              variant="light"
              css={iconButtonCss}
            >
              <Delete width={13} />
            </Button>
          )}
          {!isPlaying && !isEditing && status !== "DONE" && (
            <Button
              onClick={onPlay}
              color="green"
              variant="light"
              css={iconButtonCss}
            >
              <Play width={16} />{" "}
            </Button>
          )}
          {isPlaying && !isEditing && status !== "DONE" && (
            <Button
              onClick={onPause}
              color="primary"
              variant="light"
              css={iconButtonCss}
            >
              <Pause width={20} />
            </Button>
          )}

          {!isEditing && status !== "DONE" && (
            <Button
              onClick={onDone}
              color="primary"
              variant="light"
              css={iconButtonCss}
            >
              <Check width={14} />
            </Button>
          )}
          {!isEditing && status === "DONE" && (
            <Button
              onClick={onUnDone}
              color="primary"
              variant="light"
              css={iconButtonCss}
            >
              <Close width={14} />
            </Button>
          )}
        </SpacedChildren>
      </SpacedChildren>
    </SpacedChildren>
  );
};
