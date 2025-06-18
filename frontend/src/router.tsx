import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import { About, Home, AdminPage, ErrorPage, Login, Register, ContactPage, Denuncia } from "./pages";
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
        path: "/admin",
        element: (
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        ),
      },
      {
        path: "/contacts",
        element: <ContactPage />,
      },
      {
        path: "/denuncia",
        element: <Denuncia />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}