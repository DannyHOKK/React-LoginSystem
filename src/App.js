import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Topview from "./layout/Topview";
import HomePage from "./functionPages/ShowTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./functionPages/AddUser";
import EditUser from "./functionPages/EditUser";
import ViewUser from "./functionPages/ViewUser";
import LoginPage from "./functionPages/LoginPage";
import Register from "./functionPages/Register";
import ShowAuthUser from "./functionPages/ShowAuthUser";
import Login from "./functionPages/ShowTable";
import ShowTable from "./functionPages/ShowTable";
import Home from "./layout/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Topview />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/showtable" element={<ShowTable />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/editauthuser" element={<ShowAuthUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
