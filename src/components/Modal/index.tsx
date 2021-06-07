import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { useContextualRouting } from '@hooks/useContextualRouting';
import { StyledModal } from './styles';
import Portal from '@components/Portal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose:
    | React.MouseEventHandler<HTMLElement>
    | React.KeyboardEventHandler<HTMLElement>;
  previousId?: string;
  nextId?: string;
  children: React.ReactNode;
}

const Modal = (props: ModalProps): React.ReactElement => {
  const { isOpen, onRequestClose, previousId, nextId, children } = props;
  const { makeContextualHref } = useContextualRouting();

  if (isOpen) {
    return (
      <Portal portalElementId="portal-root">
        <StyledModal className="w-screen h-screen min-h-screen fixed top-0 left-0 overflow-scroll z-50 flex items-start justify-center">
          <button
            onClick={onRequestClose as React.MouseEventHandler<HTMLElement>}
          >
            <IoIosClose
              size={36}
              className="fixed top-1 left-1 text-gray-200 cursor-pointer z-20 hover:text-white"
            />
          </button>
          {previousId && (
            <Link
              href={makeContextualHref({ id: previousId })}
              as={`/photos/${previousId}`}
              shallow={true}
              scroll={false}
            >
              <a className="fixed inset-y-0 left-10 text-gray-200 my-auto h-0 z-20">
                <IoIosArrowBack size={32} />
              </a>
            </Link>
          )}
          {nextId && (
            <Link
              href={makeContextualHref({ id: nextId })}
              as={`/photos/${nextId}`}
              shallow={true}
              scroll={false}
            >
              <a className="fixed inset-y-0 right-10 text-gray-200 my-auto h-0 z-20">
                <IoIosArrowForward size={32} />
              </a>
            </Link>
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
};

export default Modal;
