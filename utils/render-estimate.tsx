import { EstimateType } from "types/TaskTypes";

export const renderEstimate = ({ h, m, s }: EstimateType) => {
  return ` ${h ? `${h}h` : ""} ${m ? `${m}m` : ""} ${s ? `${s}s` : ""}`;
};
