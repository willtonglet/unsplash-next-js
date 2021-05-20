import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { useContextualRouting } from '../../hooks/useContextualRouting';
import { StyledModal } from './styles';

interface ModalProps {
  isOpen: boolean;
  requestClose: string;
  requestPrevId?: string;
  requestNextId?: string;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { isOpen, requestClose, requestPrevId, requestNextId, children } =
    props;
  const { makeContextualHref } = useContextualRouting();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <StyledModal className="w-screen h-screen min-h-screen fixed top-0 left-0 overflow-scroll z-50 flex items-start justify-center">
        <Link href={requestClose} scroll={false}>
          <IoIosClose
            size={36}
            className="fixed top-1 left-1 text-gray-200 cursor-pointer z-20 hover:text-white"
          />
        </Link>
        {requestPrevId && (
          <div className="fixed inset-y-0 left-10 my-auto h-0 z-20">
            <Link
              href={makeContextualHref({ id: requestPrevId })}
              as={`/photos/${requestPrevId}`}
              scroll={false}
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
              scroll={false}
            >
              <a className="text-gray-200 cursor-pointer hover:text-white">
                <IoIosArrowForward size={32} />
              </a>
            </Link>
          </div>
        )}

        <div className="bg-white rounded w-10/12 min-h-full my-10 z-20">
          {children}
        </div>
        <Link href={requestClose} scroll={false}>
          <a>
            <div className="overlay w-screen min-h-screen fixed top-0 left-0 bg-opacity-50 bg-black z-10" />
          </a>
        </Link>
      </StyledModal>
    );
  }

  return <></>;
};

export default Modal;
