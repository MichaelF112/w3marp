import {
  createContext,
  useReducer,
  useContext,
} from "react";

export const ModalContext = createContext();

export const useModalContext = () =>
  useContext(ModalContext);

let initialState = false;

const modalReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODAL":
      return action.payload;
    default:
      return state;
  }
};

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    modalReducer,
    initialState
  );

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
