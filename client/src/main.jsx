import { React, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
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
import UpdatePassword from "./pages/updatePassword/updatePassword.jsx";
import AvaliableJobs from "./pages/avalible_jobs/avaliable_jobs.jsx";
import JobHistory from "./pages/job_history/job_history.jsx";
import ViewUsers from "./pages/view_users/view_users.jsx";
import Logs from "./pages/log/logs.jsx";
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
            key={1}
            componetToRender={<Home />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/AiAssistance",
        element: (
          <ConditionalRoute
            key={2}
            role="STANDARD"
            componetToRender={<AiAssistance />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/AiChat",
        element: (
          <ConditionalRoute
            key={3}
            role="STANDARD"
            componetToRender={<AiChat />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/SelectCupid",
        element: (
          <ConditionalRoute
            key={4}
            role="STANDARD"
            componetToRender={<SelectCupid />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/CreateNotification",
        element: (
          <ConditionalRoute
            key={5}
            componetToRender={<CreateNotification />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/MyAccount",
        element: (
          <ConditionalRoute
            key={6}
            componetToRender={<MyAccount />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/ChangePassword",
        element: (
          <ConditionalRoute
            key={7}
            componetToRender={<UpdatePassword />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/CupidCash",
        element: (
          <ConditionalRoute
            key={8}
            role="STANDARD"
            componetToRender={<CupidCash />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/Purchases",
        element: (
          <ConditionalRoute
            key={9}
            role="STANDARD"
            componetToRender={<Purchases />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/AvaliableJobs",
        element: (
          <ConditionalRoute
            key={10}
            role="CUPID"
            componetToRender={<AvaliableJobs />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/JobHistory",
        element: (
          <ConditionalRoute
            key={11}
            role="CUPID"
            componetToRender={<JobHistory />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/ViewUsers",
        element: (
          <ConditionalRoute
            key={12}
            role="ADMIN"
            componetToRender={<ViewUsers />}
            route={"/" /* Redirects to login if there is no auth user */}
          />
        ),
      },
      {
        path: "/Logs",
        element: (
          <ConditionalRoute
            key={13}
            role="ADMIN"
            componetToRender={<Logs />}
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
