import React from "react";

const Card = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`${
        className ? className : "py-8 c-space bg-white"
      } rounded-base`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
