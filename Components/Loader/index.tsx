import React from "react";
import { ColorRing, Style } from "react-loader-spinner";

interface Props {
  height?: string;
  width?: string;
  style?: Style;
  color?: string;
}

const Loader = ({
  height = "20",
  width = "20",
  style,
  color = "#fff",
}: Props) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="color-ring-loading"
      wrapperStyle={style}
      wrapperClass="color-ring-wrapper"
      colors={
        [...Array(5).fill(color)] as [string, string, string, string, string]
      }
    />
  );
};

export default Loader;
