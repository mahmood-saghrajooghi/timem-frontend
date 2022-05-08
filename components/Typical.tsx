import React, {  useCallback } from "react";
import { type, type as loopedType } from "../utils/type-animation";

export const useTypical = (targetRef: React.MutableRefObject<any>) => {
  const update = useCallback(
    ({
      steps,
      loop,
    }: {
      steps: (string | number | Function)[];
      loop: number;
    }) => {
      if (loop === Infinity) {
        // type(targetRef.current, ...steps, loopedType);
      } else if (typeof loop === "number") {
        type(targetRef.current, ...Array(loop).fill(steps).flat());
      } else {
        type(targetRef.current, ...steps);
      }
    },
    []
  );
  return { update };
};
