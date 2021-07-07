import React from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import Portal from '@components/Portal';
import { StyledModal } from './styles';

interface ModalProps {
  isOpen: boolean;
  onRequestClose:
    | React.MouseEventHandler<HTMLElement>
    | React.KeyboardEventHandler<HTMLElement>;
  onClickPrevious?: React.MouseEventHandler<HTMLElement> | null;
  onClickNext?: React.MouseEventHandler<HTMLElement> | null;
  nextId?: string;
  children: React.ReactNode;
}

const ModalPhotosNavigation = React.forwardRef<HTMLDivElement, ModalProps>(
  (props: ModalProps, ref): React.ReactElement => {
    const { isOpen, onRequestClose, onClickPrevious, onClickNext, children } =
      props;

    if (isOpen) {
      return (
        <Portal portalElementId="portal-root">
          <StyledModal
            ref={ref}
            className="w-screen h-screen min-h-screen fixed top-0 left-0 overflow-scroll z-50 flex items-start justify-center"
          >
            <button
              onClick={onRequestClose as React.MouseEventHandler<HTMLElement>}
            >
              <IoIosClose
                size={36}
                className="fixed top-1 left-1 text-gray-200 cursor-pointer z-20 hover:text-white"
              />
            </button>
            {typeof onClickPrevious === 'function' && (
              <button
                onClick={onClickPrevious}
                className="fixed inset-y-0 left-10 text-gray-200 my-auto h-0 z-20"
              >
                <IoIosArrowBack size={32} />
              </button>
            )}
            {typeof onClickNext === 'function' && (
              <button
                onClick={onClickNext}
                className="fixed inset-y-0 right-10 text-gray-200 my-auto h-0 z-20"
              >
                <IoIosArrowForward size={32} />
              </button>
            )}

            <div className="bg-white rounded w-10/12 min-h-full my-10 z-20">
              {children}
            </div>
            <div
              role="button"
              onClick={onRequestClose as React.MouseEventHandler<HTMLElement>}
              onKeyPress={
                onRequestClose as React.KeyboardEventHandler<HTMLElement>
              }
              tabIndex={0}
              className="overlay w-screen min-h-screen fixed top-0 left-0 bg-opacity-50 bg-black z-10"
            />
          </StyledModal>
        </Portal>
      );
    }

    return <></>;
  },
);

ModalPhotosNavigation.displayName = 'ModalPhotosNavigation';
export default ModalPhotosNavigation;
