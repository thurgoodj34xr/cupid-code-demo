import { React, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import SignIn from "./pages/signIn/sign_in.jsx";
import SignUp from "./pages/signUp/sign_up.jsx";
import { ConditionalRoute } from "./componets/conditional_route";
import Home from "./pages/home/home";
import AiAssistance from "./pages/ai_assistance/ai_assistance";
import AiChat from "./pages/ai_chat/ai_chat";
import SelectCupid from "./pages/select_cupid/select_cupid";
import MyAccount from "./pages/my_account/my_account";
import CupidCash from "./pages/cupid_cash/cupid_cash";
import CreateNotification from "./pages/createNotification/createNotification.jsx";
import Purchases from "./pages/purchases/purchases";
import SelectAccount from "./pages/select_account/select_account.jsx";

const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/selectAccount",
        element: <SelectAccount />,
      },
      {
        path: "/Home",
        element: (
          <ConditionalRoute
            componetToRender={<Home />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/AiAssistance",
        element: (
          <ConditionalRoute
            componetToRender={<AiAssistance />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/AiChat",
        element: (
          <ConditionalRoute
            componetToRender={<AiChat />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/SelectCupid",
        element: (
          <ConditionalRoute
            componetToRender={<SelectCupid />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/CreateNotification",
        element: (
          <ConditionalRoute
            componetToRender={<CreateNotification />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/MyAccount",
        element: (
          <ConditionalRoute
            componetToRender={<MyAccount />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/CupidCash",
        element: (
          <ConditionalRoute
            componetToRender={<CupidCash />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/Purchases",
        element: (
          <ConditionalRoute
            componetToRender={<Purchases />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
