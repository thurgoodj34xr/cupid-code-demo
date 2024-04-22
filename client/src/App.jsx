import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppContext from "./componets/app_context";
import Navbar from "./componets/navbar/navbar";
import Notification from "./componets/notification/notification";
import { io } from "socket.io-client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [notification, setNotification] = useState("");
  const [accountT, setAccountT] = useState("Standard");
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const location = useLocation()
    .pathname.replace("/", "")
    .split(/(?=[A-Z])/);

  useEffect(() => {
    if (tokens?.accessToken) {
      localStorage.setItem("token", tokens.refreshToken);
    }
  }, [tokens]);

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("user", user);
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("terminate", (id) => {
        if (user.cupid && user.cupid.id == id) {
          setUser(null);
          setTokens(null);
          localStorage.removeItem("token");
          navigate("/");
        }
      });
      return () => {
        socket.off("terminate");
      };
    }
  }, [socket, user]);

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

  function Socket() {
    return socket;
  }

  function updateAccessToken(t) {
    setTokens({
      refreshToken: tokens.refreshToken,
      accessToken: t,
      hashToken: tokens.hashToken,
    });
  }

  function sendNotification(text) {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  function getNotification() {
    return notification;
  }

  function setAccountType(t) {
    setAccountT(t);
  }

  function getAccountType() {
    return accountT;
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
    AccessToken,
    RefreshToken,
    sendNotification,
    getNotification,
    setAccountType,
    getAccountType,
    Socket,
  };
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppContext.Provider value={userSettings}>
          {notification ? <Notification text={notification} /> : ""}
          <div className={user ? "background" : "background gradient"}>
            <div className="main">
              {!user ? "" : <Navbar title={location.join(" ")}></Navbar>}
              <Outlet />
            </div>
          </div>
        </AppContext.Provider>
      </MantineProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
