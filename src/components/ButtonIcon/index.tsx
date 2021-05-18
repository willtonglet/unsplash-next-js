import React from 'react';

interface ButtonIconProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ButtonIcon = (props: ButtonIconProps) => {
  const { children, className, ...rest } = props;

  return (
    <button
      type="button"
      className={`rounded bg-gray-200 h-9 w-10 flex justify-center items-center text-gray-500 hover:bg-white hover:text-gray-900 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
