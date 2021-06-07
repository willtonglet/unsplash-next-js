import { useEffect, useRef } from 'react';
import { StyledNavigationScroller } from './styles';

interface NavigationScrollerProps {
  children: React.ReactNode;
  className?: string;
}

const NavigationScroller = ({
  children,
  className,
}: NavigationScrollerProps): React.ReactElement => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [children]);

  return (
    <StyledNavigationScroller ref={mainRef} className={className}>
      {children}
    </StyledNavigationScroller>
  );
};

export default NavigationScroller;
