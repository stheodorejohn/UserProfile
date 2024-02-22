 
import UserProfile from "./pages/UserProfile";
import { Toaster } from "react-hot-toast";

function App() { 

  return (
    <>
      <UserProfile />
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: {
            style: {
              maxWidth: "240px",
              background: "rgba(217, 217, 217, 0.3)",
              color: "white",
            },
          },
        }}
      />
    </>
  );
}

export default App;
