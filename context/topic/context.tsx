import { useDevtoolsContext } from "devtools/context";
import { useCustomTimer } from "hooks/useCustomTimer";
import React, { createContext, HTMLProps, useCallback } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { TaskStatus, TaskType } from "types/TaskTypes";
import { TopicContextType } from "./types";
import { initialTopicsValue } from "./constants";
import { reducer } from "./reducer";
import { useMemo } from "react";
import { useState } from "react";
import { TopicType } from "types/TopicTypes";

export const TopicContext = createContext<TopicContextType | null>(null);

export const TopicContextProvider: React.FC = (props) => {
  const [topicsData, dispatch] = useReducer(reducer, initialTopicsValue);

  const [filteredTopics, setFilteredTopics] = useState<TopicType[]>([]);
  const [filterOptions, setFilterOptions] = useState<{
    searchStr: string;
    status: TaskStatus | null;
  }>({
    searchStr: "",
    status: null,
  });

  const timer = useCustomTimer();

  const { setJsonSrc, updateData } = useDevtoolsContext();
  const helpers = useMemo(
    () => ({
      startTimerFn: timer.start,
      pauseTimerFn: timer.pause,
      setJsonSrc,
    }),
    [timer, setJsonSrc]
  );

  const updateTopic = useCallback(
    (topicId: string, updates: { title: string }) => {
      dispatch({ type: "UPDATE_TOPIC", values: { topicId, updates }, helpers });
    },
    []
  );

  const updateTask = useCallback(
    (updates: {
      topicId: string;
      taskId: string;
      taskValues: Partial<TaskType>;
    }) => {
      dispatch({ type: "SET_TOPICS", values: updates, helpers });
    },
    []
  );

  const addNewTopic = useCallback(() => {
    dispatch({ type: "ADD_NEW_TOPIC", values: {}, helpers });
  }, []);

  const addTask = useCallback((topicId: string) => {
    dispatch({ type: "ADD_NEW_TASK", values: { topicId }, helpers });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    dispatch({ type: "DELETE_TASK", values: {taskId}, helpers });
  }, []);


  const playTask = useCallback((taskId: string) => {
    dispatch({ type: "PLAY_TASK", values: { taskId }, helpers });
  }, []);

  const pauseTask = useCallback((taskId: string) => {
    dispatch({ type: "PAUSE_TASK", values: { taskId }, helpers });
  }, []);

  const pauseAllTasks = useCallback(() => {
    dispatch({ type: "PAUSE_ALL_TASKS", values: {}, helpers });
  }, []);

  const playAllTasks = useCallback(() => {
    dispatch({ type: "PLAY_ALL_TASKS", values: {}, helpers });
  }, []);

  const setTaskDone = useCallback((taskId: string) => {
    dispatch({ type: "SET_TASK_DONE", values: { taskId }, helpers });
  }, []);

  useEffect(() => {
    setJsonSrc(topicsData);
    updateData.current = (v) => {
      dispatch({ type: "SET_TOPICS", values: v, helpers });
    };
  }, []);

  useEffect(() => {
    const filteredTopics = topicsData.topics.map((tpc) => {
      return {
        ...tpc,
        tasks: tpc.tasks.filter((task) => {
          const statusMatch =
            filterOptions.status !== null
              ? task.status === filterOptions.status
              : true;
          return task.title.includes(filterOptions.searchStr) && statusMatch;
        }),
      };
    });
    setFilteredTopics(filteredTopics);
  }, [topicsData, filterOptions]);

  return (
    <TopicContext.Provider
      {...props}
      value={{
        topics: topicsData.topics,
        filteredTopics,
        currentSessionTasks: topicsData.currentSessionTasks,
        updateTask,
        playTask,
        pauseTask,
        pauseAllTasks,
        playAllTasks,
        setTaskDone,
        addTask,
        timer,
        setFilterOptions,
        filterOptions,
        updateTopic,
        addNewTopic,
        deleteTask,
      }}
    />
  );
};

export const useTopicContext = () => {
  return useContext(TopicContext);
};
