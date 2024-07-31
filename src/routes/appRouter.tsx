import { RouteObject } from "react-router-dom";

import Landing from "./landing";
import Home from "/src/pages/Home";
import Account from "/src/pages/Account";
import Setting from "/src/pages/Setting";
import View from "/src/pages/View";
import New from "/src/pages/New";

import ProtectedRoute from "./protected";

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
        path: "account",
        element: <ProtectedRoute children={<Account />} />,
      },
      {
        path: "setting",
        element: <ProtectedRoute children={<Setting />} />,
      },
      {
        path: "/view/:id",
        element: <ProtectedRoute children={<View />} />,
      },
    ],
  },
  {
    path: "new",
    element: <New />,
  },
];

export default routes;
