"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ModalContext = createContext(null);

export const ModalProviders = ({ children }) => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(null);
  const [modalDetails,setModalDetails] = useState({});
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const modal = url.searchParams.get("ref");
    if(modal) {
      setIsModalOpened(true);
      setActiveModal(modal);
    }
  }, []);

  const openModal = (modalName,isRefVisible = false) => {
    setIsModalOpened(true);
    setActiveModal(modalName);
    if(isRefVisible) {
      const url = new URL(window.location.href);

      // Remove trailing slash if it exists
      if (url.pathname.endsWith("/")) {
        url.pathname = url.pathname.slice(0, -1);
      }
  
      url.searchParams.set("ref", modalName);
      router.push(url.toString());
    }
  };
  

  const closeModal = () => {
    setIsModalOpened(false);
    setActiveModal(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("ref");
    router.push(url.toString());
  };

  return (
    <ModalContext.Provider value={{activeModal,setActiveModal, openModal,isModalOpened, closeModal,setModalDetails,modalDetails }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};  