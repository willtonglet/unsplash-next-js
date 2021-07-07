import { useAvoidScrolling } from '@hooks/useAvoidScrolling';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ModalPhotosNavigationContextProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalPhotosNavigationContext =
  createContext<ModalPhotosNavigationContextProps>({
    isModalOpen: false,
    setIsModalOpen: () => null,
  });

export const ModalPhotosNavigationContextProvider: React.FC = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useAvoidScrolling(isModalOpen);

  return (
    <ModalPhotosNavigationContext.Provider
      value={{ isModalOpen, setIsModalOpen }}
    >
      {children}
    </ModalPhotosNavigationContext.Provider>
  );
};
