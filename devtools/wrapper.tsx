import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import themeColorsConfig from "theme-colors.config";
import { DevtoolsProvider, useDevtoolsContext } from "./context";
import ChevronUp from "../icons/chevron-up.svg";
import { Label } from "components/Label";

const ReactJson = dynamic(import("react-json-view"), { ssr: false });

const DevtoolsContainer = styled.div`
  position: fixed;
  height: ${({ isExpanded }: { isExpanded: boolean }) =>
    isExpanded ? "50vh" : 0};
  width: 100vw;
  left: 0;
  bottom: 0;
  z-index: 99;
  border-top: 1px solid ${themeColorsConfig["timem-gray"][100]};
  background: radial-gradient(#ebebeb 1px, #fff 1px);

  & .react-json-view {
    height: 100%;
    font-family: "Roboto Mono", monospace !important;
    font-size: 13px;
    font-weight: 500;
    overflow-y: auto;
  }

  .variable-editor {
    outline: 0 !important;
    border: none !important;
    font-family: "Roboto Mono", monospace !important;
    font-size: 12px;
    font-weight: 500;
  }

  .variable-row {
    display: flex;
  }
`;

export const WrappedContent: React.FC = ({ children }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const {
    jsonSrc,
    updateData: triggerUpdate,
    isExpanded,
    toggleExpanded,
  } = useDevtoolsContext();
  useEffect(() => {
    setShouldRender(true);
  }, []);
  return shouldRender ? (
    <>
      {children}
      {createPortal(
        <DevtoolsContainer
          isExpanded={isExpanded}
          className={isExpanded ? "group" : "h-0"}
        >
          <div className="relative p-4 h-full">
            <ReactJson
              src={jsonSrc}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              iconStyle="square"
              indentWidth={2}
              onEdit={(v) => {
                triggerUpdate.current(v.updated_src);
              }}
            />
            <div css={{ position: "absolute", right: ".5rem", top: ".5rem", zIndex: 1 }}>
              <Label color="gray" size="sm">toggle: command + j</Label>
            </div>
          </div>
          <button
            onClick={toggleExpanded}
            className={[
              "h-5 px-2 right-24 bottom-0 cursor-pointer text-xs font-medium flex items-center justify-center bg-timem-gray-100 text-timem-gray-900 hover:text-white hover:bg-timem-gray-900 group-hover:flex",
              isExpanded ? "absolute bottom-full" : "fixed",
            ].join(" ")}
          >
            devtools
            <span
              css={{
                marginLeft: ".25rem",
                transform: isExpanded ? "rotatex(180deg)" : "",
              }}
            >
              <ChevronUp width={12} />
            </span>
          </button>
        </DevtoolsContainer>,
        document.body
      )}
    </>
  ) : (
    <></>
  );
};
export const DevtoolsWrapper: React.FC = ({ children }) => {
  return (
    <DevtoolsProvider>
      <WrappedContent>{children}</WrappedContent>
    </DevtoolsProvider>
  );
};
