import React from "react";

export const useToggleModal = (): [boolean, () => void, (fn: () => void) => void] => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const switchModal = (fn: () => void) => {
    setIsOpen(false);
    setTimeout(() => {
      fn();
    }, 300);
  };

  return [isOpen, toggleModal, switchModal];
};
