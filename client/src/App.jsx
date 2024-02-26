import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/sign_in";
import SignUp from "./pages/signUp/sign_up";
import { useState, useEffect } from "react";
import AppContext from "./componets/app_context";
import { ConditionalRoute } from "./componets/conditional_route";
import AiAssistance from "./pages/ai_assistance/ai_assistance";
import AiChat from "./pages/ai_chat/ai_chat";
import SelectCupid from "./pages/select_cupid/select_cupid";
import MyAccount from "./pages/my_account/my_account";
import CupidCash from "./pages/cupid_cash/cupid_cash";
import Purchases from "./pages/purchases/purchases";

function App() {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    if (tokens?.accessToken) {
      localStorage.setItem("token", tokens.refreshToken);
      localStorage.setItem("id", tokens.hashToken.id);
    }
  }, [tokens]);

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

  function AccessToken() {
    return tokens.accessToken;
  }

  function RefreshToken() {
    return tokens.refreshToken;
  }

  function updateAccessToken(t) {
    setTokens({
      refreshToken: tokens.refreshToken,
      accessToken: t,
      hashToken: tokens.hashToken,
    });
  }

  function updateHashToken(t) {
    setTokens({
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      hashToken: t,
    });
  }

  /*
    These functions will be avalible for access on 
    any of the pages. Feel free to add more of them
    above to make life easier.
  */
  const userSettings = {
    updateUser,
    getUser,
    updateTokens,
    getTokens,
    updateAccessToken,
    updateHashToken,
    AccessToken,
    RefreshToken,
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

            {/* Pages that required an auth user */}
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
            <Route
              exact
              path="/aiAssistance"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<AiAssistance />}
                  route={"/" /* Redirects to login if there is no auth user */}
                />
              }
            />
            <Route
              exact
              path="/aiChat"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<AiChat />}
                  route={"/" /* Redirects to login if there is no auth user */}
                />
              }
            />
            <Route
              exact
              path="/selectCupid"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<SelectCupid />}
                  route={"/" /* Redirects to login if there is no auth user */}
                />
              }
            />
            <Route
              exact
              path="/myAccount"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<MyAccount />}
                  route={"/" /* Redirects to login if there is no auth user */}
                />
              }
            />
            <Route
              exact
              path="/cupidCash"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<CupidCash />}
                  route={"/" /* Redirects to login if there is no auth user */}
                />
              }
            />
            <Route
              exact
              path="/purchases"
              element={
                <ConditionalRoute
                  condition={user != null /* Requires an auth user */}
                  componetToRender={<Purchases />}
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
