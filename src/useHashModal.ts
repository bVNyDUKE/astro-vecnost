import { useCallback, useEffect, useState } from "react";

export const useHashModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    if (window.location.hash !== "#open") {
      window.location.hash = "#open";
    }
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash === "#open") {
      window.location.hash = "";
    }
  }, []);

  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [closeModal, openModal, isOpen]);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "hashchange",
      () => {
        if (window.location.hash === "#open") {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
