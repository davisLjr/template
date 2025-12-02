import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

export type ServiceType = "contabilidad" | "asesoria" | "constitucion-iva" | "prueba" | null;

interface ServiceModalContextType {
  openModal: ServiceType;
  openServiceModal: (service: ServiceType) => void;
  closeServiceModal: () => void;
}

const ServiceModalContext = createContext<ServiceModalContextType | undefined>(undefined);

export const ServiceModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<ServiceType>(null);

  // Memoizar callbacks para evitar re-renderizados innecesarios
  const openServiceModal = useCallback((service: ServiceType) => {
    setOpenModal(service);
  }, []);

  const closeServiceModal = useCallback(() => {
    setOpenModal(null);
  }, []);

  // Memoizar el value del context para evitar re-renderizados
  const contextValue = useMemo(
    () => ({ openModal, openServiceModal, closeServiceModal }),
    [openModal, openServiceModal, closeServiceModal]
  );

  return (
    <ServiceModalContext.Provider value={contextValue}>
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
