import { RouteObject } from "react-router-dom";

import Landing from "./Landing.route";
import Home from "/src/pages/Home";
import Account from "/src/pages/Account";
import Setting from "/src/pages/Setting";
import View from "/src/pages/View";
import Editor from "../pages/Editor";
import NotFound from "/src/pages/NotFound";

import ProtectedRoute from "./Protected.route";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        index: true,
        element: <ProtectedRoute children={<Home />} />,
      },
      {
        path: "account/:identifier",
        element: <ProtectedRoute children={<Account />} />,
      },
      {
        path: "setting",
        element: <ProtectedRoute children={<Setting />} />,
      },
      {
        path: "/view/project/:id",
        element: <ProtectedRoute children={<View />} />,
      },
      {
        path: "/edit/project/:id",
        element: <ProtectedRoute children={<Editor />} />,
      },
    ],
  },
  {
    path: "new",
    element: <ProtectedRoute children={<Editor />} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
