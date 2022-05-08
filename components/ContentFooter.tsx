import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { useAppLoadingContext } from "../context/loadingContext";
import { ThemeColors } from "../types/ThemeTypes";
import { Label } from "./Label";
import { AnimatedLogo } from "./logo/Logo";
import { SpacedChildren } from "./styled/SpacedChildren";
import { useTypical } from "./Typical";

export const ContentFooter: React.FC = () => {
  const [appIsLoading] = useAppLoadingContext();
  const [logoTheme, setLogoTheme] = useState<ThemeColors>("primary");
  const labelRef = useRef(null);
  const { update } = useTypical(labelRef);
  useEffect(() => {
    if (appIsLoading) {
      update({ steps: ["loading..."], loop: 1 });
      setLogoTheme("primary");
    } else {
      update({ steps: ["Storylia"], loop: 1 });
      setLogoTheme("blue");
    }
  }, [appIsLoading]);
  return (
    <SpacedChildren
      spaceDirection="right"
      childSpace=".5rem"
      className="mt-auto h-[38px] bg-white border-t border-timem-gray-100 flex items-center px-2"
    >
      <div className="w-[28px] -mt-[5px]">
        <AnimatedLogo
          // cubeSize={14}
          cubeScale={.38}
          borderWidth={2}
          borderWidth1={3}
          shouldAnimate={appIsLoading}
          theme={logoTheme}
        />
      </div>
      <Label
        ref={labelRef}
        size="xs"
        color={logoTheme}
        variant="light"
        css={css({ height: 20 })}
      >
        Storylia
      </Label>
      <Label
        size="xs"
        color="red"
        variant="light"
        className="ml-auto"
        css={css({ height: 20 })}
      >
        Network Error
      </Label>
    </SpacedChildren>
  );
};
