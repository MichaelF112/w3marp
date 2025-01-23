import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

const initialState = null;

const walletReducer = (state, action) => {
  switch (action.type) {
    case "SET_WALLET":
      return action.payload;
    case "DELETE_WALLET":
      return null;
    default:
      return state;
  }
};

export const WalletProvider = ({ children }) => {
  const [walletState, walletDispatch] = useReducer(
    walletReducer,
    initialState
  );
  useEffect(() => {
    const walletData = localStorage.getItem(
      "blockstack-session"
    );
    const parsedWalletData = JSON.parse(walletData);

    if (parsedWalletData) {
      walletDispatch({
        type: "SET_WALLET",
        payload: parsedWalletData,
      });
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletState, walletDispatch }}
    >
      {children}
    </WalletContext.Provider>
  );
};
