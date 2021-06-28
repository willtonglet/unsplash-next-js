import { useEffect, useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import { StyledPopover } from './styles';

interface PopoverProps {
  children: React.ReactNode;
  childrenToBeOpened: React.ReactNode;
  className?: string;
}

const Popover = ({
  children,
  childrenToBeOpened,
}: PopoverProps): React.ReactElement => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>();
  const [startTransitionEnd, setStartTransitionEnd] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'arrow',
        options: { element: arrowElement },
      },
    ],
  });

  const handleMouseEnter = () => {
    setDelayHandler(
      setTimeout(() => {
        setIsPopperOpen(true);
        setStartTransitionEnd(false);
      }, 1000),
    );
    clearTimeout(delayHandler as NodeJS.Timeout);
  };

  const handleMouseLeave = () => {
    setDelayHandler(setTimeout(() => setStartTransitionEnd(true), 1000));
    clearTimeout(delayHandler as NodeJS.Timeout);
  };

  useEffect(() => {
    if (startTransitionEnd && popperRef.current)
      popperRef.current?.addEventListener('animationend', () =>
        setIsPopperOpen(false),
      );

    return () => {
      if (startTransitionEnd && popperRef.current)
        popperRef.current?.removeEventListener('animationend', () =>
          setIsPopperOpen(false),
        );
    };
  }, [startTransitionEnd]);

  return (
    <StyledPopover
      className="inline-block relative box-border"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={setReferenceElement}>{children}</div>
      {isPopperOpen && (
        <div
          ref={setPopperElement}
          style={{ zIndex: 1000, ...styles.popper }}
          className="popper-wrapper"
          {...attributes.popper}
        >
          <div
            ref={popperRef}
            className="bg-white border rounded relative shadow-md popper"
            style={{
              animationName: startTransitionEnd ? 'pingOut' : 'ping',
            }}
          >
            {childrenToBeOpened}
            <div ref={setArrowElement} className="arrow" />
          </div>
        </div>
      )}
    </StyledPopover>
  );
};

export default Popover;
