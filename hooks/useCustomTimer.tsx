import React, { useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { EstimateType } from "types/TaskTypes";
import { getTimeFromEstimateObj, getTimeFromStr } from "./customTimerUtils";

export const useCustomTimer = (props?: {
  onExpire?: () => void;
  autoStart?: boolean;
  expiryTimestamp?: EstimateType;
  onEdit?: (estimate: EstimateType) => void;
}) => {
  const onEditFn = useRef<(v: EstimateType) => void>(() => {});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lastExpiryTime, setLastExpiryTime] = useState<EstimateType>({
    h: 0,
    m: 25,
    s: 0,
  });
  const [inputValue, setInputValue] = useState<string>("25m");
  const [inputSize, setInputSize] = useState<number>(6);
  const [inputIsChanged, setInputIsChanged] = useState<boolean>(false);
  const timerBoxRef = useRef<HTMLDivElement>();
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: getTimeFromEstimateObj(
      props?.expiryTimestamp ? props?.expiryTimestamp : { h: 0, m: 25, s: 0 }
    ),
    onExpire: props?.onExpire
      ? props?.onExpire
      : () => console.warn("onExpire called"),
    autoStart: props?.autoStart || false,
  });
  const updateInputSize = useCallback((value: string) => {
    const length = value.length;
    setInputSize(length ? length * 1.24 : 6);
  }, []);
  const handleEnterEditingMode = useCallback(() => {
    const text = timerBoxRef.current.innerText;
    setInputValue(text);
    updateInputSize(text);
    setIsEditing(true);
  }, [timerBoxRef]);
  const handleExitEditingMode = useCallback(() => {
    const autoStart = isRunning;
    const timeValues = getTimeFromStr(inputValue);
    onEditFn.current && onEditFn.current(timeValues);
    if (inputIsChanged) {
      setLastExpiryTime(timeValues);
    }
    restart(getTimeFromEstimateObj(timeValues), autoStart);
    setIsEditing(false);
  }, [isRunning, inputValue, inputIsChanged]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
      updateInputSize(e.currentTarget.value);
      setInputIsChanged(true);
    },
    []
  );
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter" || e.code === "Tab") {
        handleExitEditingMode();
      }
    },
    [handleExitEditingMode]
  );
  const handleRestartClick = useCallback(() => {
    restart(getTimeFromEstimateObj(lastExpiryTime), false);
  }, [lastExpiryTime]);
  const renderTime = useCallback(() => {
    return (
      <>
        {hours ? `${hours}h` : ""} {minutes ? `${minutes}m` : ""}{" "}
        {seconds ? `${seconds}s` : ""}
      </>
    );
  }, [hours, minutes, seconds]);
  const inputProps = useMemo<React.InputHTMLAttributes<HTMLInputElement>>(
    () => ({
      onChange: handleInputChange,
      onKeyDown: handleInputKeyDown,
      value: inputValue,
      size: inputSize,
    }),
    [handleInputChange, handleInputKeyDown, inputValue]
  );
  const labelProps = useMemo<React.HTMLAttributes<HTMLDivElement>>(
    () => ({
      onClick: handleEnterEditingMode,
      ref: timerBoxRef,
    }),
    [timerBoxRef, handleEnterEditingMode]
  );

  useEffect(() => {
    if (props?.onEdit) {
      onEditFn.current = props.onEdit;
    }
  }, []);

  return {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
    timerBoxRef,
    inputSize,
    inputValue,
    setInputValue,
    isEditing,
    lastExpiryTime,
    handleEnterEditingMode,
    handleExitEditingMode,
    handleInputChange,
    handleInputKeyDown,
    handleRestartClick,
    renderTime,
    getNewTime: getTimeFromEstimateObj,
    inputProps,
    labelProps,
    onEditFn,
  };
};
