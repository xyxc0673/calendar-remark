import { atom, useAtom } from 'jotai';

export const shareModalOpenAtom = atom<boolean>(false);

export const useShareModal = () => {
  const [isOpen, setIsOpen] = useAtom(shareModalOpenAtom);

  const openShareModal = () => {
    setIsOpen(true);
  };

  const closeShareModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openShareModal,
    closeShareModal,
  };
};
