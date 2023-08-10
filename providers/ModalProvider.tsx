"use client";

import { useEffect, useState } from "react";

import PreviewModal from "@/components/modals/PreviewModal";
import AuthModal from "@/components/modals/AuthModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
