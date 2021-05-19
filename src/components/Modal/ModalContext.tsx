import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export const ModalContextProvider: React.FC = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
