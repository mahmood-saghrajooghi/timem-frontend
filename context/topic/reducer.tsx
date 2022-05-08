import { EstimateType, TaskType } from "types/TaskTypes";
import {
  getUpdatedTopic,
  taskExists,
  startTask,
  stopCurrrentTask,
  addTaskToCurrentSession,
  findTaskInTopics,
  newTaskItem,
  newTopicItem,
} from "./utils";
import { TimerHelpers, TopicsActionType, TopicsStateType } from "./types";
import { TopicType } from "types/TopicTypes";

export function reducer(
  state: TopicsStateType,
  action: TopicsActionType
): TopicsStateType {
  let updatedState: TopicsStateType;
  switch (action.type) {
    case "SET_TOPICS":
      updatedState = updateTaskReducerFn(state, action.values);
      break;
    case "UPDATE_TOPIC":
      updatedState = udpateTopic(state, action.values);
      break;
    case "PLAY_TASK":
      updatedState = playTask(state, action.values.taskId, action.helpers);
      break;
    case "PAUSE_TASK":
      updatedState = pauseTask(state, action.values.taskId, action.helpers);
      break;
    case "PAUSE_ALL_TASKS":
      updatedState = pauseAllTasks(state);
      break;
    case "PLAY_ALL_TASKS":
      updatedState = playAllTasks(state);
      break;
    case "SET_TASK_DONE":
      updatedState = setTaskDone(state, action.values.taskId, action.helpers);
      break;
    case "ADD_NEW_TASK":
      updatedState = addNewTask(state, action.values.topicId);
      break;
    case "DELETE_TASK":
      updatedState = deleteTask(state, action.values.taskId);
      break;
    case "ADD_NEW_TOPIC":
      updatedState = addNewTopic(state);
      break;
    default:
      updatedState = state;
      break;
  }
  action.helpers.setJsonSrc(updatedState);
  return updatedState;
}

// utils
function updateTaskReducerFn(
  state: TopicsStateType,
  updates: {
    topicId: string;
    taskId: string;
    taskValues: Partial<TaskType>;
  }
) {
  const updatedTopics = [];

  state.topics.forEach((tpc) => {
    const { activeTasks: tasks, updatedTopic } = getUpdatedTopic(tpc, updates);
    updatedTopics.push(updatedTopic);
  });

  return {
    ...state,
    topics: updatedTopics,
  };
}

function udpateTopic(
  state: TopicsStateType,
  values: {
    topicId: string;
    updates: { title: string };
  }
) {
  const updatedTopics: TopicType[] = state.topics.map((tpc) => {
    if (tpc.id === values.topicId) {
      return { ...tpc, title: values.updates.title };
    }
    return tpc;
  });

  return {
    ...state,
    topics: updatedTopics,
  };
}

function playTask(
  state: TopicsStateType,
  taskId: string,
  helpers: TimerHelpers
): TopicsStateType {
  let currentSessionTasks: { id: string; isPlaying: boolean }[] = [];
  currentSessionTasks = stopCurrrentTask(state.currentSessionTasks);
  if (taskExists(state.currentSessionTasks, taskId)) {
    currentSessionTasks = startTask(currentSessionTasks, taskId);
  } else {
    currentSessionTasks = addTaskToCurrentSession(
      currentSessionTasks,
      findTaskInTopics(state.topics, taskId)
    );
  }
  helpers.startTimerFn();
  return { ...state, currentSessionTasks };
}

function pauseTask(
  state: TopicsStateType,
  taskId: string,
  helpers: TimerHelpers
): TopicsStateType {
  let currentSessionTasks: { id: string; isPlaying: boolean }[] =
    state.currentSessionTasks.filter((tsk) => tsk.id !== taskId);
  if (currentSessionTasks.length <= 0) {
    helpers.pauseTimerFn();
  } else {
    currentSessionTasks = currentSessionTasks.map((tsk, index) => ({
      ...tsk,
      isPlaying: index === 0,
    }));
  }
  return { ...state, currentSessionTasks };
}

function pauseAllTasks(state: TopicsStateType): TopicsStateType {
  return {
    ...state,
    currentSessionTasks: state.currentSessionTasks.map((tsk) => ({
      ...tsk,
      isPlaying: false,
    })),
  };
}

function playAllTasks(state: TopicsStateType): TopicsStateType {
  return {
    ...state,
    currentSessionTasks: state.currentSessionTasks.map((tsk, index) => ({
      ...tsk,
      isPlaying: index == 0,
    })),
  };
}

function setTaskDone(
  state: TopicsStateType,
  taskId: string,
  helpers: TimerHelpers
) {
  const currentSessionTasks = state.currentSessionTasks.filter(
    (tsk) => tsk.id !== taskId
  );
  const topics = state.topics.map((tpc) => ({
    ...tpc,
    tasks: tpc.tasks.map((tsk) => ({
      ...tsk,
      status: tsk.id === taskId ? "DONE" : tsk.status,
      completed: tsk.id === taskId ? new Date() : null,
    })),
  }));
  if (currentSessionTasks.length <= 0) {
    helpers.pauseTimerFn();
  }
  return { topics, currentSessionTasks };
}

function addNewTask(state: TopicsStateType, topicId: string): TopicsStateType {
  const topics: TopicType[] = state.topics.map((tpc) =>
    tpc.id === topicId
      ? { ...tpc, tasks: [...tpc.tasks, newTaskItem(topicId)] }
      : { ...tpc }
  );
  return { ...state, topics };
}
function deleteTask(state: TopicsStateType, taskId: string): TopicsStateType {
  const topics = state.topics.map((tpc) => ({
    ...tpc,
    tasks: tpc.tasks.filter((tsk) => tsk.id !== taskId),
  }));
  return { ...state, topics };
}

function addNewTopic(state: TopicsStateType): TopicsStateType {
  const topics = [...state.topics, newTopicItem()];
  return { ...state, topics };
}
