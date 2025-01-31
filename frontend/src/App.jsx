import Routers from "./routes/Routes";
import { Header } from "./components/header";
import { useModalContext } from "./context/ModalContext";
import { ListItemModal } from "./components/listItemModal";

function App() {
  const { state, dispatch } = useModalContext();
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />
      <main className="w-full mx-auto py-6 sm:px-6 lg:px-8">
        <Routers />
      </main>
      <ListItemModal
        isOpen={state}
        onClose={() =>
          dispatch({ type: "SET_MODAL", payload: !state })
        }
      />
    </div>
  );
}

export default App;
