import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { loggedScreensRoutes, screensRoutes } from "./routes/routes";
import useAuthentication from "./hooks/useAuthentication";

function App() {
  const { verifyLoggedIn } = useAuthentication();

  const routes: RouteObject[] = [...screensRoutes];
  const routesLoggedIn: RouteObject[] = [...loggedScreensRoutes].map((route) => ({
    ...route,
    loader: verifyLoggedIn,
  }));

  const router = createBrowserRouter([...routes, ...routesLoggedIn]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
