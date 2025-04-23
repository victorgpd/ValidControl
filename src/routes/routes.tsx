import { RoutesEnum } from "../enums/routes";
import { RouteObject } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

export const screensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Home,
    element: <Home />,
    errorElement: <div>404</div>, //<PageNotFound />,
  },
];

export const loggedScreensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Login,
    element: <Login />,
  },
];
