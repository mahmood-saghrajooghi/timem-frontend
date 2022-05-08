import React from "react";
import { Interpolation, Theme } from "@emotion/react";
import { ThemeColors } from "../../types/ThemeTypes";
import themeColors from "../../theme-colors.config";

import Logo32 from "./logo-32.svg";
import Logo64 from "./logo-64.svg";
import Logo128 from "./logo-128.svg";
import Logo256 from "./logo-256.svg";

type LogoVariant = 32 | 64 | 128 | 256;

const LogoVariants: Record<LogoVariant, any> = {
  32: Logo32,
  64: Logo64,
  128: Logo128,
  256: Logo256,
};

interface LogoProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  width?: number;
  variant?: LogoVariant;
}

export const Logo: React.FC<LogoProps> = ({ width = 32, variant = 32 }) => {
  const Logo = LogoVariants[variant];
  return <Logo width={width} />;
};

export const AnimatedLogo: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>;
    cubeSize?: number;
    cubeScale?: number;
    borderWidth?: number;
    borderWidth1?: number;
    shouldAnimate?: boolean;
    theme?: ThemeColors;
  }
> = ({
  className,
  css,
  cubeSize,
  borderWidth,
  borderWidth1,
  shouldAnimate,
  theme,
  cubeScale,
  ...props
}) => {
  const cssObj: Record<string, string> = {};
  if (cubeSize) {
    cssObj["--cubeSize"] = `${cubeSize}px`;
  }
  if (borderWidth) {
    cssObj["--borderWidth"] = `${borderWidth}px`;
  }
  if (borderWidth1) {
    cssObj["--borderWidth1"] = `${borderWidth1}px`;
  }
  if (!shouldAnimate) {
    cssObj["--animationIterationCount"] = "1";
  }
  if (theme) {
    cssObj["--borderColor"] = themeColors[`timem-${theme}`][900];
    cssObj["--outerCubeColor"] = themeColors[`timem-${theme}`][100];
    cssObj["--outerCubeColor-dim"] = themeColors[`timem-${theme}`][200];
    cssObj["--outerCubeColor-dimer"] = themeColors[`timem-${theme}`][300];
  }

  return (
    <div css={{ "--cubeScale": cubeScale }} className="scene-container">
      <div css={[css, cssObj]} className={`scene ${className}`} {...props}>
        <div className="webpack-cube">
          <div className="outer-cube">
            <div className="face face-top">
              <span></span>
            </div>
            <div className="face face-left">
              <span></span>
            </div>
            <div className="face face-right">
              <span></span>
            </div>
            <div className="face face-front">
              <span></span>
            </div>
            <div className="face face-back">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
