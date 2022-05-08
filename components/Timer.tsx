import { Label } from "./Label";
import { useCallback } from "react";
import { Input } from "./Input";
import { SpacedChildren } from "./styled/SpacedChildren";
import { Button } from "./Button";
import { css } from "@emotion/react";
import Play from "../icons/play.svg";
import Pause from "../icons/pause.svg";
import Refresh from "../icons/refresh.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { useTopicContext } from "context/topic/context";

const iconButtonCss = css({
  padding: 0,
  width: 20,
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

interface TimerProps {
  onPause: () => void;
  onPlay: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onPause, onPlay }) => {
  const { timer } = useTopicContext();
  const {
    inputSize,
    inputValue,
    isEditing,
    timerBoxRef,
    renderTime,
    resume,
    start,
    pause,
    handleExitEditingMode,
    handleEnterEditingMode,
    handleRestartClick,
    handleInputChange,
  } = timer;
  const handleStart = useCallback(() => {
    onPlay();
    start();
  }, [start, onPlay]);
  const handlePause = useCallback(() => {
    onPause();
    pause();
  }, [pause, onPause]);
  return (
    <div className="mt-auto h-[38px] border-t border-timem-gray-100 flex items-center px-2">
      {isEditing ? (
        <OutsideClickHandler onOutsideClick={handleExitEditingMode}>
          <Input
            color="white-outline"
            variant="dark"
            cSize="sm"
            size={inputSize}
            autoFocus
            className="h-[20px] py-0 flex items-center"
            value={inputValue}
            onChange={handleInputChange}
          />
        </OutsideClickHandler>
      ) : (
        <Label
          color="light-gray"
          variant="dark"
          size="sm"
          className="h-[20px] py-0 flex items-center"
          onClick={handleEnterEditingMode}
          ref={timerBoxRef}
        >
          {renderTime()}
        </Label>
      )}

      <SpacedChildren
        spaceDirection="right"
        childSpace=".25rem"
        className="text-md flex ml-auto"
      >
        <Button color="green" css={iconButtonCss} onClick={handleStart}>
          <Play width={16} />
        </Button>
        <Button color="white-outline" css={iconButtonCss} onClick={handlePause}>
          <Pause width={20} />
        </Button>
        <Button
          color="primary"
          css={iconButtonCss}
          onClick={handleRestartClick}
        >
          <Refresh width={13} />
        </Button>
      </SpacedChildren>
    </div>
  );
};
