import * as React from "react";

const Icon = ({
  className,
  children,
  width,
}: {
  className?: string;
  children: React.ReactElement;
  width?: string;
}) => {
  return (
    <children.type
      {...children.props}
      className={`w-${width ?? "5"} h-5 m-2 ${className ?? ""} ${
        children.props.className
      }`}
    />
  );
};

export default Icon;
