import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/sign_in";
import SignUp from "./pages/signUp/sign_up";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();

  function handleUser(user) {
    setUser(user);
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn setuser={handleUser} />} />
          <Route
            exact
            path="/sign_up"
            element={<SignUp setuser={handleUser} />}
          />
          <Route exact path="/home" element={<Home user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
