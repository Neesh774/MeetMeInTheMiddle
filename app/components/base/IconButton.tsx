import * as React from "react";
import Icon from "./Icon";

const IconButton = ({
  children,
  onClick,
  className,
  iconStyles,
  width,
  disabled,
}: {
  children: React.ReactElement;
  onClick?: () => void;
  className?: string;
  iconStyles?: string;
  width?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`border-2 flex justify-center items-center border-transparent hover:border-gray-300 focus:border-secondary-400 transition-all duration-300 rounded-lg cursor-pointer ${
        disabled && "opacity-50 cursor-not-allowed"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon width={width} className={iconStyles}>
        <children.type />
      </Icon>
    </button>
  );
};

export default IconButton;
