import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { useContextualRouting } from '../../hooks/useContextualRouting';
import { StyledModal } from './styles';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  requestPrevId?: string;
  requestNextId?: string;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { isOpen, onRequestClose, requestPrevId, requestNextId, children } =
    props;
  const modalRef = useRef<HTMLDivElement>(null);
  const { makeContextualHref } = useContextualRouting();

  useEffect(() => {
    modalRef.current?.addEventListener('click', onRequestClose);
    return () => modalRef.current?.removeEventListener('click', onRequestClose);
  }, []);

  if (isOpen) {
    return (
      <StyledModal className="w-screen h-screen min-h-screen fixed top-0 left-0 overflow-scroll z-50 flex items-start justify-center">
        <IoIosClose
          size={36}
          onClick={onRequestClose}
          className="fixed top-1 left-1 text-gray-200 cursor-pointer z-20 hover:text-white"
        />
        {requestPrevId && (
          <div className="fixed inset-y-0 left-10 my-auto h-0 z-20">
            <Link
              href={makeContextualHref({ id: requestPrevId })}
              as={`/photos/${requestPrevId}`}
            >
              <a className="text-gray-200 cursor-pointer hover:text-white">
                <IoIosArrowBack size={32} />
              </a>
            </Link>
          </div>
        )}
        {requestNextId && (
          <div className="fixed inset-y-0 right-10 my-auto h-0 z-20">
            <Link
              href={makeContextualHref({ id: requestNextId })}
              as={`/photos/${requestNextId}`}
            >
              <a className="text-gray-200 cursor-pointer hover:text-white">
                <IoIosArrowForward size={32} />
              </a>
            </Link>
          </div>
        )}

        <div className="bg-white px-3 rounded w-10/12 my-10 z-20">
          {children}
        </div>

        <div
          className="overlay w-screen min-h-screen fixed top-0 left-0 bg-opacity-50 bg-black z-10"
          ref={modalRef}
        />
      </StyledModal>
    );
  }

  return <></>;
};

export default Modal;
