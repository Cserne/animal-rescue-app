import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import Helps from "./pages/Helps";
import Register from "./pages/Register";
import ShowAllUsers from "./pages/ShowAllUsers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="mypage" element={<Mypage />}></Route>
          <Route path="helps" element={<Helps />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="showallusers" element={<ShowAllUsers />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
