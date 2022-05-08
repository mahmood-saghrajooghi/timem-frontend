import { EstimateType, TaskType } from "types/TaskTypes";
import { TopicType } from "types/TopicTypes";
import { v4 } from "uuid";

export function getUpdatedTopic(
  tpc: TopicType,
  updates: { taskId: string; topicId: string; taskValues: Partial<TaskType> }
): {
  updatedTopic: TopicType;
  activeTasks: TaskType[];
} {
  let updatedTopic: TopicType;
  const activeTasks: TaskType[] = [];
  if (tpc.id !== updates.topicId) {
    updatedTopic = { ...tpc };
  }
  const updatedTpc: TopicType = { id: tpc.id, title: tpc.title, tasks: [] };

  tpc.tasks.forEach((tsk) => {
    if (tsk.id !== updates.taskId) {
      tsk.status === "DOING" && activeTasks.push({ ...tsk });
      return updatedTpc.tasks.push({ ...tsk });
    }
    const newTask: TaskType = {
      ...tsk,
      ...updates.taskValues,
    };

    newTask.status === "DOING" && activeTasks.push({ ...newTask });
    updatedTpc.tasks.push(newTask);
  });
  updatedTopic = updatedTpc;
  return {
    updatedTopic,
    activeTasks,
  };
}

export function getTasksTotalEstimate(tasks: TaskType[]) {
  const totalEstimate: EstimateType = { h: 0, m: 0, s: 0 };
  tasks.forEach((tsk) => {
    if (tsk.status === "DOING") {
      totalEstimate.h += tsk.estimate.h;
      totalEstimate.m += tsk.estimate.m;
      totalEstimate.s += tsk.estimate.s;
    }
  });
  return totalEstimate;
}

export function addEstimates(e1: EstimateType, e2: EstimateType) {
  return {
    h: e1.h + e2.h,
    m: e1.m + e2.m,
    s: e1.s + e2.s,
  };
}
export function taskExists(tasks: { id: string }[], taskId) {
  return tasks.filter((t) => t.id === taskId).length > 0;
}
export function stopCurrrentTask(
  tasks: { id: string; isPlaying: boolean }[]
): { id: string; isPlaying: boolean }[] {
  return [...tasks].map((tsk) => ({ ...tsk, isPlaying: false }));
}
export function startTask(
  tasks: { id: string; isPlaying: boolean }[],
  taskId: string
): { id: string; isPlaying: boolean }[] {
  return [...tasks].map((tsk) => ({
    ...tsk,
    isPlaying: tsk.id === taskId ? true : false,
  }));
}
export function getAllTasks(topics: TopicType[]): TaskType[] {
  return topics.reduce((agg, tpc) => {
    return [...agg, ...tpc.tasks];
  }, []);
}

export function findTaskInTopics(topics: TopicType[], taskId: string) {
  let task: TaskType;
  topics.forEach((tpc) => {
    tpc.tasks.forEach((tsk) => {
      if (tsk.id === taskId) {
        task = tsk;
      }
    });
  });
  return task;
}

export function addTaskToCurrentSession(
  currentSession: { id: string; isPlaying: boolean }[],
  task: TaskType
): { id: string; isPlaying: boolean }[] {
  const data = { id: task.id, isPlaying: true };
  if (currentSession.length === 0) {
    return [data];
  }
  return [...currentSession, data];
}

export function newTaskItem(topicId: string): TaskType {
  return {
    id: v4(),
    topicId,
    title: "Title",
    desc: "Description",
    created: new Date(),
    deadline: null,
    completed: null,
    estimate: { h: 0, m: 25, s: 0 },
    status: "TODO",
  };
}

export function newTopicItem(): TopicType{
  return {
    id: v4(),
    title: 'Title',
    tasks: []
  }
}