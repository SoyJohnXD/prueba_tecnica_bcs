interface IconBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
}

const IconBubble = ({ icon, className, ...props }: IconBubbleProps) => {
  return (
    <div
      className={`${
        className ? className : "w-[2.6875rem] h-[2.125rem] bg-neutral-light"
      } rounded-full grid place-content-center`}
      {...props}
    >
      {icon}
    </div>
  );
};

export default IconBubble;
