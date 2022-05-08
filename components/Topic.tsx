import { css } from "@emotion/react";
import React, { useCallback, useRef, useState } from "react";
import { Label } from "./Label";
import { Button } from "./Button";
import ChevronDown from "../icons/chevron-down.svg";
import Add from "../icons/add.svg";
import { SpacedChildren } from "./styled/SpacedChildren";

const iconButtonCss = css({
  padding: 0,
  width: 20,
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

interface TopicProps {
  showDetails?: boolean;
  addTask: () => void;
  title: string;
  onUpdateTopic: (props: { title: string }) => void;
  pendingTasksCount: number;
  completeTasksCount: number;
  totalTasksCount: number;
}

export const Topic: React.FC<TopicProps> = ({
  children,
  showDetails = true,
  addTask,
  title,
  onUpdateTopic,
  pendingTasksCount,
  completeTasksCount,
  totalTasksCount
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(showDetails);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const toggleIsExpanded = useCallback(() => setIsExpanded((c) => !c), []);
  const handleDiscard = useCallback(() => {
    titleRef.current.innerText = title;
    setIsEditing(false);
  }, [titleRef, title]);
  const handleSave = useCallback(() => {
    onUpdateTopic({
      title: titleRef.current.innerText as string,
    });
    setIsEditing(false);
  }, [titleRef]);

  return (
    <SpacedChildren
      spaceDirection="bottom"
      childSpace=".5rem"
      className="px-2 py-2 bg-timem-light-gray-400"
    >
      {/* header */}
      <div className="pb-2 border-b border-dashed border-timem-gray-100">
        <SpacedChildren spaceDirection="bottom" childSpace=".5rem">
          <div className="flex items-center">
            <div
              className="text-sm font-medium text-timem-gray-900 outline-0 leading-5 flex-1"
              contentEditable
              onInput={() => setIsEditing(true)}
              ref={titleRef}
            >
              {title}
            </div>

            <SpacedChildren
              spaceDirection="right"
              childSpace=".5rem"
              className="flex ml-auto"
            >
              <Button
                onClick={toggleIsExpanded}
                css={[iconButtonCss]}
                className="bg-timem-light-gray-400 hover:bg-timem-light-gray-900"
              >
                <ChevronDown
                  className="text-timem-gray-500"
                  css={css({ transform: isExpanded ? "rotate(180deg)" : "" })}
                  width={12}
                />
              </Button>
            </SpacedChildren>
          </div>
          <SpacedChildren
            spaceDirection="right"
            childSpace=".5rem"
            className="flex"
          >
            <Label color="primary" variant="lighter" size="xs">
              {pendingTasksCount} Pending
            </Label>
            <Label color="green" variant="lighter" size="xs">
              {completeTasksCount}/{totalTasksCount} Complete
            </Label>

            {isEditing && (
              <>
                <Button
                  size="xs"
                  color="white-outline"
                  className="ml-auto"
                  css={css({ height: 20, paddingTop: 0, paddingBottom: 0 })}
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
                <Button size="xs" onClick={handleSave}>
                  Save
                </Button>
              </>
            )}
          </SpacedChildren>
        </SpacedChildren>
      </div>
      {/* content */}
      {isExpanded && (
        <SpacedChildren spaceDirection="bottom" childSpace=".5rem">
          {children}
        </SpacedChildren>
      )}
      {/* footer */}
      <div className="flex items-center">
        <Button
          color="green"
          variant="light"
          css={iconButtonCss}
          className="ml-auto"
          onClick={addTask}
        >
          <Add width={16} />
        </Button>
      </div>
    </SpacedChildren>
  );
};
