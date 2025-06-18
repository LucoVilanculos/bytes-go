import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import { About, Home, OrdersUser, CheckoutPage, AdminPage, ErrorPage, Products, Login, Register, Account, Details, ContactPage } from "./pages";
import { MainLayout } from "./layout/main-layout";
import type { JSX } from "react";

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
      {
        path: "/account",
        element: (
          <RequireAuth>
            <Account />
          </RequireAuth>
        ),
      },
      {
        path: "/checkout",
        element: (
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        ),
      },
      {
        path: "/shop",
        element: <Products />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/product/:id",
        element: <Details />,
      },
      {
        path: "/orders",
        element: (
          <RequireAuth>
            <OrdersUser />
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
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/contacts",
        element: <ContactPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}