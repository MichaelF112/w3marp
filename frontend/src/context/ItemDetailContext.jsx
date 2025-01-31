import {
  createContext,
  useReducer,
  useContext,
} from "react";

export const ItemDetailContext = createContext();

export const useItemDetailContext = () =>
  useContext(ItemDetailContext);

let initialState = {
  id: "",
  seller: "",
  name: "",
  description:
    "",
  price: 0,
  image: "",
  category: "",
  location: "",
  contact: "",
};

const itemDetailReducer = (state, action) => {
  switch (action.type) {
    case "SET_DETAIL":
      return action.payload;
    default:
      return state;
  }
};

export const ItemDetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    itemDetailReducer,
    initialState
  );

  return (
    <ItemDetailContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemDetailContext.Provider>
  );
};
