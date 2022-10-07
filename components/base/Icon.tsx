import * as React from "react";

const Icon = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactElement;
}) => {
  return (
    <children.type
      {...children.props}
      className={`w-5 h-5 m-2 ${className ?? ""} ${children.props.className}`}
    />
  );
};

export default Icon;
