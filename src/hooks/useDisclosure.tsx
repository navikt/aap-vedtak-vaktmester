// https://blogg.bekk.no/kaptein-krok-%EF%B8%8F-usedisclosure-5654962b3ad2
import { useState, useCallback } from "react";

export const useDisclosure = (defaultOpen: false) => {
  const [isOpen, setOpen] = useState<boolean>(defaultOpen);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((prev) => !prev), []);
  return { isOpen, onOpen, onClose, onToggle };
};
