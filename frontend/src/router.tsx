import { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import { SplashScreen } from "./components/splash";

<<<<<<< HEAD
import { About, Home,  AdminPage, ErrorPage,  Login,  Account, Driver, ContactPage } from "./pages";
import { Register } from "./pages/register";
=======
import { About, Home, OrdersListPage, AdminPage, ErrorPage, UserDashboard, Login, Register, Account, Driver, DriverAvenidasPage, ContactPage } from "./pages";
>>>>>>> dev-luco

import { MainLayout } from "./layout/main-layout";
import type { JSX } from "react";
import { Denuncia } from "./pages/denuncias";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
<<<<<<< HEAD
    {
      path: "/account",
      element: (
        <RequireAuth>
          <Account />
        </RequireAuth>
      ),
    },
    {
      path: "/admin",
      element: (
        <RequireAuth>
          <AdminPage />
        </RequireAuth>
      ),
    },
      
=======
      {
        path: "/account",
        element: (
          <RequireAuth>
            <Account />
          </RequireAuth>
        ),
      },
      {
        path: "/driver",
        element: (
          <RequireAuth>
            <Driver />
          </RequireAuth>
        ),
      },
      {
        path: "/user",
        element: (
          <RequireAuth>
            <UserDashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/orders",
        element: (
          <RequireAuth>
            <OrdersListPage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin",
        element: (
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        ),
      },
>>>>>>> dev-luco
      {
        path: "/contacts",
        element: <ContactPage />,
      },
      {
        path: "/denuncia",
        element: <Denuncia />,
      },
      {
        path: "/driver-avenidas",
        element: <DriverAvenidasPage />,
      },
    ],
  },
]);

export function Routes() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <RouterProvider router={router} />;
}