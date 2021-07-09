import Portal from '@components/Portal';
import { useAvoidScrolling } from '@hooks/useAvoidScrolling';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

const Modal = ({
  children,
  isOpen,
  onClose,
}: ModalProps): React.ReactElement => {
  useAvoidScrolling(isOpen);

  if (isOpen)
    return (
      <Portal>
        <div
          role="button"
          tabIndex={0}
          className="bg-black bg-opacity-75 h-screen w-screen fixed top-0 left-0 z-50 zoom-out"
          onClick={onClose}
          onKeyPress={onClose as () => void}
        />
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-2/5 bg-white rounded fixed overflow-hidden z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </Portal>
    );

  return <></>;
};

export default Modal;
