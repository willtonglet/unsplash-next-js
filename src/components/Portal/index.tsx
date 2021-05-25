import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  id?: string;
  children: React.ReactNode;
}

const Portal = ({ id, children }: PortalProps): JSX.Element => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <></>;

  return ReactDOM.createPortal(
    children,
    document.querySelector(`#${id}`) as HTMLElement,
  );
};

export default Portal;
