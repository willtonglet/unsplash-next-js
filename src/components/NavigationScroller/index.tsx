import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { StyledNavigationScroller } from './styles';

interface NavigationScrollerProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: 'primary' | 'secondary';
}

const NavigationScroller = ({
  children,
  className,
  backgroundColor = 'primary',
}: NavigationScrollerProps): React.ReactElement => {
  const mainRef = useRef<HTMLDivElement>(null);

  const [arrow, setArrow] = useState({
    left: false,
    right: false,
  });

  function sideScroll(
    direction: 'left' | 'right',
    speed: number,
    distance: number,
    step: number,
  ) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (mainRef.current)
        if (direction === 'left') {
          mainRef.current.scrollLeft -= step;
        } else {
          mainRef.current.scrollLeft += step;
        }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);

    return slideTimer;
  }

  function handleArrowControl(direction: 'left' | 'right') {
    const handlePosition = direction === 'left' ? 'left-0' : 'right-0';

    return (
      arrow[direction] && (
        <>
          <div
            className={`absolute ${handlePosition} top-0 h-full bg-gradient-to-${
              direction === 'left' ? 'r' : 'l'
            } from-${
              backgroundColor === 'primary' ? 'white' : 'gray-50'
            } w-40 pointer-events-none`}
          />
          <button
            onClick={() => {
              if (mainRef.current)
                sideScroll(
                  direction,
                  5,
                  mainRef.current?.getBoundingClientRect().width,
                  15,
                );
            }}
            className={`flex items-center absolute ${handlePosition} top-0 h-full text-gray-500 focus:outline-none`}
          >
            {direction === 'left' ? (
              <IoIosArrowBack size={21} />
            ) : (
              <IoIosArrowForward size={21} />
            )}
          </button>
        </>
      )
    );
  }

  useEffect(() => {
    function handleScrollArrowToHide() {
      return mainRef.current &&
        mainRef.current.scrollWidth >
          mainRef.current.getBoundingClientRect().width
        ? setArrow({
            left: mainRef.current.scrollLeft > 0,
            right:
              mainRef.current.offsetWidth + mainRef.current.scrollLeft <
              mainRef.current.scrollWidth,
          })
        : setArrow({
            left: false,
            right: false,
          });
    }

    handleScrollArrowToHide();
    mainRef.current?.addEventListener('scroll', handleScrollArrowToHide);
    window.addEventListener('resize', handleScrollArrowToHide);

    return () => {
      mainRef.current?.removeEventListener('scroll', handleScrollArrowToHide);
      window.removeEventListener('resize', handleScrollArrowToHide);
    };
  }, [mainRef, children]);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [children]);

  return (
    <div className="w-full relative">
      <StyledNavigationScroller ref={mainRef} className={className}>
        {children}
      </StyledNavigationScroller>
      {handleArrowControl('left')}
      {handleArrowControl('right')}
    </div>
  );
};

export default NavigationScroller;
