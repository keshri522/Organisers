import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paths from "./Components/Router/Router";
// import "../node_modules/antd/dist/antd.css";
function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Paths></Paths>
    </div>
  );
}

export default App;
