import { createContext } from "react";

interface IfcModal {
  modal: React.ReactNode | null;
  setModal: Function;
}

const defaultModalContext = {
  modal: null,
  setModal: Function
};

const ModalContext = createContext<IfcModal>(defaultModalContext);

export default ModalContext;