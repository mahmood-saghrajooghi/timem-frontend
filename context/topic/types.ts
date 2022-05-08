import { useCustomTimer } from "hooks/useCustomTimer";
import { TaskStatus, TaskType } from "types/TaskTypes";
import { TopicType } from "types/TopicTypes";
import { initialTopicsValue } from "./constants";

export interface TimerHelpers {
  startTimerFn: () => void;
  pauseTimerFn: () => void;
  setJsonSrc: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export interface CurrentSessionTaskType {
  id: string;
  isPlaying: boolean;
}

export type TopicsStateType = typeof initialTopicsValue;
export type TopicsActionType =
  | {
      type: "UPDATE_TOPIC";
      values: {
        topicId: string;
        updates: { title: string };
      };
      helpers: TimerHelpers;
    }
  | {
      type: "SET_TOPICS";
      values: {
        topicId: string;
        taskId: string;
        taskValues: Partial<TaskType>;
      };
      helpers: TimerHelpers;
    }
  | {
      type: "PLAY_TASK" | "PAUSE_TASK" | "SET_TASK_DONE" | "DELETE_TASK";
      values: {
        taskId: string;
      };
      helpers: TimerHelpers;
    }
  | {
      type: "PAUSE_ALL_TASKS" | "PLAY_ALL_TASKS" | "ADD_NEW_TOPIC";
      values: {};
      helpers: TimerHelpers;
    }
  | {
      type: "ADD_NEW_TASK";
      values: { topicId: string };
      helpers: TimerHelpers;
    };

export type TopicContextType = {
  topics: TopicType[];
  updateTask: (props: {
    topicId: string;
    taskId: string;
    taskValues: Partial<TaskType>;
  }) => void;
  currentSessionTasks: { id: string; isPlaying: boolean }[];
  timer: ReturnType<typeof useCustomTimer>;
  playTask: (taskId: string) => void;
  pauseTask: (taskId: string) => void;
  setTaskDone: (taskId: string) => void;
  pauseAllTasks: () => void;
  playAllTasks: () => void;
  addTask: (topicId: string) => void;
  filteredTopics: TopicType[];
  setFilterOptions: React.Dispatch<
    React.SetStateAction<{
      searchStr: string;
      status: TaskStatus | null;
    }>
  >;
  filterOptions: { searchStr: string; status: TaskStatus | null };
  updateTopic: (topicId: string, values: { title: string }) => void;
  addNewTopic: () => void;
  deleteTask: (taskId: string) => void;
};
