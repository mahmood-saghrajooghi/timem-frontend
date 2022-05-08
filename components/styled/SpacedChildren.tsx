import styled from "@emotion/styled";

export const SpacedChildren = styled.div<{
  childSpace: string;
  spaceDirection: "right" | "left" | "top" | "bottom";
}>`
  > * {
    margin-${({ spaceDirection: direction }) => direction}: ${({
  childSpace,
}) => childSpace};
    &:last-child {
      margin-${({ spaceDirection: direction }) => direction}: 0;
    }
  }
`;
