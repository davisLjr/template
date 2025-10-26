import { createContext, useContext, useState, ReactNode } from "react";

export type ServiceType = "contabilidad" | "asesoria" | null;

interface ServiceModalContextType {
  openModal: ServiceType;
  openServiceModal: (service: ServiceType) => void;
  closeServiceModal: () => void;
}

const ServiceModalContext = createContext<ServiceModalContextType | undefined>(undefined);

export const ServiceModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<ServiceType>(null);

  const openServiceModal = (service: ServiceType) => {
    setOpenModal(service);
  };

  const closeServiceModal = () => {
    setOpenModal(null);
  };

  return (
    <ServiceModalContext.Provider value={{ openModal, openServiceModal, closeServiceModal }}>
      {children}
    </ServiceModalContext.Provider>
  );
};

export const useServiceModal = () => {
  const context = useContext(ServiceModalContext);
  if (!context) {
    throw new Error("useServiceModal debe ser usado dentro de ServiceModalProvider");
  }
  return context;
};
