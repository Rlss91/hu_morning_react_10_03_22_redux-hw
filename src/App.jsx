import { useSelector } from "react-redux";

import "./App.css";
import Login from "./components/Login.component";

function App() {
  const loginRedux = useSelector((state) => state.auth.loggedIn);
  return (
    <div className="container">
      <Login></Login>
      {loginRedux && <h1>You logged In</h1>}
    </div>
  );
}

export default App;
