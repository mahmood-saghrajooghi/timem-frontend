import React, { useCallback, useContext, useState } from "react";
import { Menu } from "@mantine/core";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { SpacedChildren } from "components/styled/SpacedChildren";
import { ContentFooter } from "components/ContentFooter";
import { CurrentSession } from "components/CurrentSesstion";
import Layout from "components/Layout";
import { Task } from "components/Task";
import { Topic } from "components/Topic";
import { useAppLoadingContext } from "context/loadingContext";
import { TopicContext } from "context/topic/context";
import Filter from "icons/filter.svg";
import Search from "icons/search.svg";
import { Switch } from "components/Switch";

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-image: radial-gradient(#ebebeb 1px, #fff 1px);
  background-color: #fff;
  background-size: 8px 8px;
  overflow-y: hidden;

  & > * {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const iconButtonCss = css({
  padding: 0,
  width: 26,
  height: 26,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const index = () => {
  const [, setAppIsLoading] = useAppLoadingContext();

  const {
    updateTask,
    playTask,
    pauseTask,
    addTask,
    filteredTopics,
    filterOptions,
    setFilterOptions,
    updateTopic,
    addNewTopic,
    deleteTask,
  } = useContext(TopicContext);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchStr = e?.currentTarget?.value;
      setFilterOptions((c) => ({ ...c, searchStr }));
    },
    []
  );

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex h-full">
        <ContentWrapper>

          {/* header */}
          <div className="p-2 pb-0">
            <SpacedChildren
              spaceDirection="right"
              childSpace=".5rem"
              className="bg-white flex"
            >
              <Menu
                size="md"
                control={
                  <Button css={iconButtonCss} color="light-gray">
                    <Filter width={16} />
                  </Button>
                }
                closeOnItemClick={false}
              >
                <div className="py-1 px-1">
                  <Menu.Label
                    className="text-sm p-0"
                    css={{ fontFamily: "Roboto Mono, monospace" }}
                  >
                    Filter Options
                  </Menu.Label>
                  <div className="my-1 border-b border-dashed"></div>
                  <Menu.Item
                    className="text-sm font-medium h-5 p-0 mb-1"
                    css={{ fontFamily: "Roboto Mono, monospace" }}
                    rightSection={
                      <Switch
                        checked={filterOptions.status === "TODO"}
                        onChange={(event) => {
                          const checked = event.currentTarget.checked;
                          setFilterOptions((c) => ({
                            ...c,
                            status: checked ? "TODO" : null,
                          }));
                        }}
                      />
                    }
                  >
                    Show pending
                  </Menu.Item>
                  <Menu.Item
                    className="text-sm font-medium h-5 p-0"
                    css={{ fontFamily: "Roboto Mono, monospace" }}
                    rightSection={
                      <Switch
                        checked={filterOptions.status === "DONE"}
                        onChange={(event) => {
                          const checked = event.currentTarget.checked;
                          setFilterOptions((c) => ({
                            ...c,
                            status: checked ? "DONE" : null,
                          }));
                        }}
                      />
                    }
                  >
                    Show compelete
                  </Menu.Item>
                </div>
              </Menu>
              <div className="relative flex-1 flex">
                <Search
                  width={14}
                  className="absolute top-1/2 -translate-y-1/2 left-2 text-timem-gray-100"
                />
                <Input
                  color="white-outline"
                  cSize="sm"
                  size={1}
                  className="pl-7 flex-1"
                  placeholder="Search todos"
                  value={filterOptions.searchStr}
                  onChange={handleSearchInputChange}
                />
              </div>
              <Button size="sm" onClick={addNewTopic}>
                New topic
              </Button>
            </SpacedChildren>
          </div>

          {/* context */}
          <SpacedChildren
            spaceDirection="bottom"
            childSpace=".5rem"
            className="flex flex-col p-2 pt-0 flex-1 overflow-y-auto"
          >
            {filteredTopics.map((topic) => (
              <Topic
                title={topic.title}
                addTask={() => addTask(topic.id)}
                onUpdateTopic={(updates) => updateTopic(topic.id, updates)}
                pendingTasksCount={
                  topic.tasks.filter((tsk) => tsk.status === "TODO").length
                }
                completeTasksCount={
                  topic.tasks.filter((tsk) => tsk.status === "DONE").length
                }
                totalTasksCount={topic.tasks.length}
              >
                {topic.tasks
                  .filter((t) => t.status !== "DOING")
                  .map((task) => (
                    <Task
                      key={task.id}
                      status={task.status}
                      title={task.title}
                      desc={task.desc}
                      created={task.created}
                      estimate={task.estimate}
                      deadline={task.deadline}
                      completed={task.completed}
                      onPlay={() => {
                        playTask(task.id);
                        updateTask({
                          topicId: task.topicId,
                          taskId: task.id,
                          taskValues: {
                            status: "DOING",
                          },
                        });
                      }}
                      onPause={() => {
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
                        pauseTask(task.id);
                        updateTask({
                          topicId: task.topicId,
                          taskId: task.id,
                          taskValues: {
                            status: "DONE",
                            completed: new Date(),
                          },
                        });
                      }}
                      onUnDone={() => {
                        updateTask({
                          topicId: task.topicId,
                          taskId: task.id,
                          taskValues: {
                            status: "TODO",
                            completed: null,
                          },
                        });
                      }}
                      onDelete={() => {
                        deleteTask(task.id)
                      }}
                    />
                  ))}
              </Topic>
            ))}
          </SpacedChildren>

          <ContentFooter />
        </ContentWrapper>
        <CurrentSession />
      </div>
    </Layout>
  );
};

export default index;
