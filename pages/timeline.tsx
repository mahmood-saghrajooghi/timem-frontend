import styled from "@emotion/styled";
import { SpacedChildren } from "components/styled/SpacedChildren";
import { ContentFooter } from "components/ContentFooter";
import { CurrentSession } from "components/CurrentSesstion";
import Layout from "components/Layout";
import { TimelineItem } from "components/TimelineItem";

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

const timeline = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex h-full">
        <ContentWrapper>
          {/* context */}
          <SpacedChildren
            spaceDirection="bottom"
            childSpace="-.5rem"
            className="flex flex-col p-2 flex-1 overflow-y-auto"
          >
            <TimelineItem
              title="test"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, laboriosam."
              completed={new Date()}
              color="green"
              estimate={{h: 0, m: 25, s: 0}}
              doneIn={{h: 0, m: 25, s: 0}}
            />
            <TimelineItem
              title="test"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, laboriosam."
              completed={new Date()}
              color="red"
              estimate={{h: 0, m: 25, s: 0}}
              doneIn={{h: 0, m: 25, s: 0}}
            />
            <TimelineItem
              title="test"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, laboriosam."
              completed={new Date()}
              color="primary"
              estimate={{h: 0, m: 25, s: 0}}
              doneIn={{h: 0, m: 25, s: 0}}
            />
            <TimelineItem
              title="test"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, laboriosam."
              completed={new Date()}
              color="blue"
              estimate={{h: 0, m: 25, s: 0}}
              doneIn={{h: 0, m: 25, s: 0}}
            />
            <TimelineItem
              title="test"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, laboriosam."
              completed={new Date()}
              color="gray"
              estimate={{h: 0, m: 25, s: 0}}
              doneIn={{h: 0, m: 25, s: 0}}
            />
            <TimelineItem
              title="test"
              desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, laboriosam."
              completed={new Date()}
              color="secondary"
              estimate={{h: 0, m: 25, s: 0}}
              doneIn={{h: 0, m: 25, s: 0}}
            />
          </SpacedChildren>

          <ContentFooter />
        </ContentWrapper>
        <CurrentSession />
      </div>
    </Layout>
  );
};

export default timeline;
