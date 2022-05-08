import { useCustomTimer } from "hooks/useCustomTimer";

export type TaskStatus = "DONE" | "DOING" | "TODO" | "FAILED";

export interface TaskType {
  id: string;
  topicId: string;
  title: string;
  desc: string;
  created: Date;
  deadline: Date;
  completed: Date | null;
  estimate: { h: number; m: number; s: number };
  status: TaskStatus;
  timer?: ReturnType<typeof useCustomTimer>;
}

export interface EstimateType {
  h: number;
  m: number;
  s: number;
}
