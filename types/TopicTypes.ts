import { TaskType } from "./TaskTypes";
export interface TopicType {
  id: string;
  title: string;
  tasks: TaskType[];
}
