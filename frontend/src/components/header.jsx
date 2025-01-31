import { useState } from "react";
import { Wallet2, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";
import { useWallet } from "@/context/WalletContext";

import { showConnect } from "@stacks/connect";
import { userSession } from "@/utils/userSession";

export const Header = () => {
  const { dispatch } = useModalContext();
  const {walletState, walletDispatch} = useWallet();

  const [isWalletConnected, setIsWalletConnected] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const handleConnectWallet = () => {
    if (!userSession.isUserSignedIn()) {
      showConnect({
        appDetails: {
          name: "W3MARP",
          icon: window.location.origin + "/logo192.png",
        },
        redirectTo: "/",
        onFinish: (data) => {
          walletDispatch({type: "SET_WALLET", payload: data});
        },
        onCancel: () => {
          setIsWalletConnected(false);
        },
      });
    } else {
      userSession.signUserOut();
      walletDispatch({type: "DELETE_WALLET",});
    }
  };

  const userAddr = walletState?.userData?.profile?.stxAddress?.mainnet;

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">W3MARP</h1>
            </div>
            <div className="hidden md:flex items-center justify-center flex-1">
              <NavLink
                to={"/"}
                className={(navClass) =>
                  navClass.isActive
                    ? "border-indigo-500 text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Marketplace
              </NavLink>
              <NavLink
                to={"/listings"}
                className={(navClass) =>
                  navClass.isActive
                    ? "border-indigo-500 text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                My Listed Items
              </NavLink>
              <NavLink
                to={"/transactions"}
                className={(navClass) =>
                  navClass.isActive
                    ? "border-indigo-500 text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Transactions
              </NavLink>
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_MODAL",
                    payload: true,
                  })
                }
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                aria-label="List an Item"
              >
                List an Item
              </button>
            </div>
            <div className="hidden md:flex items-center">
              <button
                onClick={handleConnectWallet}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Connect Wallet"
              >
                {userSession.isUserSignedIn() ? (
                  <>
                    <Wallet2 className="mr-2 h-5 w-5" />
                    Connected as {userAddr?.slice(0, 4)}...
                  </>
                ) : (
                  <>
                    <Wallet2 className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">
                  Open main menu
                </span>
                <Menu
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                to={"/"}
                className={(navClass) =>
                  navClass.isActive
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50 px-3 py-2 rounded-md text-base font-medium w-full text-left block"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium w-full text-left block"
                }
              >
                Marketplace
              </NavLink>
              <NavLink
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                to={"/listings"}
                className={(navClass) =>
                  navClass.isActive
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50 px-3 py-2 rounded-md text-base font-medium w-full text-left block"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium w-full text-left block"
                }
              >
                My Listed Items
              </NavLink>
              <NavLink
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                to={"/transactions"}
                className={(navClass) =>
                  navClass.isActive
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50 px-3 py-2 rounded-md text-base font-medium w-full text-left block"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium w-full text-left block"
                }
              >
                Transactions
              </NavLink>
              <button
                onClick={() => {
                  dispatch({
                    type: "SET_MODAL",
                    payload: true,
                  });
                  setIsMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full text-left"
                aria-label="List an Item"
              >
                List an Item
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <button
                  onClick={() => {
                    handleConnectWallet();
                    setIsMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Connect Wallet"
                >
                  {isWalletConnected ? (
                    <>
                      <Wallet2 className="mr-2 h-5 w-5" />
                      Connected
                    </>
                  ) : (
                    <>
                      <Wallet2 className="mr-2 h-5 w-5" />
                      Connect Wallet
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
