import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import Signup from "./routes/Signup";

function App() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
