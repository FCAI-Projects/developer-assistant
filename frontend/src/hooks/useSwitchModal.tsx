export const useSwitchModal = (fn: () => void) => {
  const switchModal = () => {
    setTimeout(() => {
      fn();
    }, 500);
  };

  return switchModal;
};
