import React from 'react';

interface ContainerWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerWrapper = ({
  children,
  className,
}: ContainerWrapperProps): JSX.Element => {
  return (
    <section className={className}>
      <div className="flex w-full justify-center">
        <div className="w-full max-w-screen-xl">{children}</div>
      </div>
    </section>
  );
};

export default ContainerWrapper;
