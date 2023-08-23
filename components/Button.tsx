import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface Props {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  loading?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
}
const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  loading,
  type,
  bgColor,
  textColor,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      className={`flexCenter gap-3 px-4 py-3
      ${textColor || "text-white"}
      ${
        loading ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
