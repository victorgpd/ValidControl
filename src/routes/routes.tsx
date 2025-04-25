import { RoutesEnum } from "../enums/routes";
import { RouteObject } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Painel/Dashboard/Dashboard";
import Products from "../pages/Painel/Products/ProductsDashboard/Products";

export const screensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Home,
    element: <Home />,
    errorElement: <div>404</div>, //<PageNotFound />,
  },
  {
    path: RoutesEnum.Login,
    element: <Login />,
  },
  {
    path: RoutesEnum.Register,
    element: <Register />,
  },
];

export const loggedScreensRoutes: RouteObject[] = [
  {
    path: RoutesEnum.Dashboard,
    element: <Dashboard />,
  },
  {
    path: RoutesEnum.Products,
    element: <Products />,
  },
];
