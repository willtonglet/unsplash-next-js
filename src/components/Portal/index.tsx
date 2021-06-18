import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  portalElementId?: string;
  children: React.ReactNode;
}

const Portal = ({
  portalElementId = 'portal-root',
  children,
}: PortalProps): React.ReactElement => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <></>;

  return ReactDOM.createPortal(
    children,
    document.querySelector(`#${portalElementId}`) as HTMLElement,
  );
};

export default Portal;
