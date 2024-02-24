import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/sign_in";
import SignUp from "./pages/signUp/sign_up";
import { useState, useEffect } from "react";
import AppContext from "./componets/app_context";
import { ConditionalRoute } from "./componets/conditional_route";

function App() {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    console.log({
      user,
      tokens,
    });
    if (tokens?.accessToken) {
      localStorage.setItem("token", tokens.refreshToken);
    }
  }, [user, tokens]);

  function updateUser(user) {
    setUser(user);
  }

  function getUser() {
    return user;
  }

  function updateTokens(t) {
    setTokens(t);
  }

  function getTokens() {
    return tokens;
  }

  function updateAccessToken(t) {
    setTokens({
      refreshToken: tokens.refreshToken,
      accessToken: t,
    });
  }

  const userSettings = {
    updateUser,
    getUser,
    updateTokens,
    getTokens,
    updateAccessToken,
  };

  return (
    /*
        **************  Context Setup ******************

        Wrap app with a context that will allow child elements
        to have access to the user or another state without 
        having to pass an instance of the state down the chain

        How to setup the context in child elements:
          1) import the context
              import { useContext } from 'React';
          2) import the context store
              import AppContext from "../../componets/app_context";
          3) initalize an instance of the context
              const context = useContext(AppContext);

        How to access the data in the context
          1) get data
              const user = context.getUser()
          2) update data
              context.updateUser(user)

    */
    <AppContext.Provider value={userSettings}>
      <div className="main">
        <BrowserRouter>
          {/* Some routes require a prerequisite such as a auth user */}
          <Routes>
            {/* Setup routes that dont need a prerequisite */}
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/sign_up" element={<SignUp />} />

            {/* Home page requires an auth user */}
            <Route
              exact
              path="/home"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<Home />}
                  route={"/" /* Redirects to login if there is no auth user */}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
