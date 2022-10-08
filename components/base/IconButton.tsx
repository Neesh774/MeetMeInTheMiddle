import * as React from "react";
import Icon from "./Icon";

const IconButton = ({
  children,
  onClick,
  className,
  iconStyles,
  width,
}: {
  children: React.ReactElement;
  onClick?: () => void;
  className?: string;
  iconStyles?: string;
  width?: string;
}) => {
  return (
    <button
      className={`border-2 border-transparent hover:border-gray-300 focus:border-secondary-400 transition-all duration-300 rounded-lg cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon width={width} className={iconStyles}>
        <children.type />
      </Icon>
    </button>
  );
};

export default IconButton;
