import { StyledNavigationScroller } from './styles';

interface NavigationScrollerProps {
  children: React.ReactNode;
  className?: string;
}

const NavigationScroller = ({
  children,
  className,
}: NavigationScrollerProps): React.ReactElement => {
  return (
    <StyledNavigationScroller className={className}>
      {children}
    </StyledNavigationScroller>
  );
};

export default NavigationScroller;
