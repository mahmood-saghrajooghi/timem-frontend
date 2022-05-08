import React, { useCallback, useMemo, useState } from "react";
import { Task } from "./Task";
import { SpacedChildren } from "./styled/SpacedChildren";
import { Timer } from "./Timer";
import { useTopicContext } from "../context/topic/context";
import { TaskType } from "../types/TaskTypes";
import ChevronRight from "../icons/chevron-right.svg";
import { findTaskInTopics } from "context/topic/utils";

export const CurrentSession: React.FC<{}> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggle = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  const {
    topics,
    currentSessionTasks,
    updateTask,
    playTask,
    pauseTask,
    pauseAllTasks,
    playAllTasks,
    setTaskDone,
  } = useTopicContext();
  const activeTasks: TaskType[] = currentSessionTasks.map((tskItem) => {
    return findTaskInTopics(topics, tskItem.id);
  });

  return (
    <div className="relative group">
      <div
        className={`
      h-full flex flex-col border-l border-timem-gray-100 bg-white relative overflow-hidden ${
        isExpanded ? "w-[450px]" : "w-0"
      }`}
      >
        <div className="p-2">
          <div className="mb-2">
            <h1 className="font-bold text-md text-timem-gray-900 leading-6">
              This Session
            </h1>
          </div>
          <SpacedChildren spaceDirection="bottom" childSpace=".5rem" as={"ul"}>
            {activeTasks?.map((task) => (
              <li key={task.id}>
                <Task
                  key={task.id}
                  status={task.status}
                  title={task.title}
                  desc={task.desc}
                  created={task.created}
                  estimate={task.estimate}
                  deadline={task.deadline}
                  completed={task.completed}
                  isPlaying={
                    currentSessionTasks.filter(
                      (tsk) => tsk.id === task.id && tsk.isPlaying
                    ).length > 0
                  }
                  onPlay={() => {
                    updateTask({
                      topicId: task.topicId,
                      taskId: task.id,
                      taskValues: {
                        status: "DOING",
                      },
                    });
                    playTask(task.id);
                  }}
                  onPause={() => {
                    updateTask({
                      topicId: task.topicId,
                      taskId: task.id,
                      taskValues: {
                        status: "TODO",
                      },
                    });
                    pauseTask(task.id);
                  }}
                  onEdit={(taskValues) => {
                    updateTask({
                      topicId: task.topicId,
                      taskId: task.id,
                      taskValues,
                    });
                  }}
                  updateEstimate={(estimate) => {
                    updateTask({
                      topicId: task.topicId,
                      taskId: task.id,
                      taskValues: { estimate },
                    });
                  }}
                  onDone={() => {
                    setTaskDone(task.id);
                  }}
                  onUnDone={() => {
                    updateTask({
                      topicId: task.topicId,
                      taskId: task.id,
                      taskValues: {
                        status: "DONE",
                        completed: null,
                      },
                    });
                  }}
                />
              </li>
            ))}
          </SpacedChildren>
        </div>
        {/* footer */}
        <Timer onPlay={playAllTasks} onPause={pauseAllTasks} />
        {/* toggle */}
      </div>
      <div
        className={`absolute top-0 right-full h-full w-10
          ${isExpanded ? "translate-x-full" : ""}
      `}
      >
        <button
          onClick={toggle}
          className={`absolute h-16 w-5 bg-timem-gray-100 top-1/2 left-0 -translate-y-1/2 cursor-pointer items-center justify-center text-timem-gray-900 hover:text-white hover:bg-timem-gray-900 hidden group-hover:flex ${
            isExpanded ? "" : "rotate-180 right-0 left-auto"
          }`}
        >
          <ChevronRight width={14} />
        </button>
      </div>
    </div>
  );
};
