import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./store/Context.jsx";
import { UserContextProvider } from "./store/UserProgressCtx.jsx";
import { lazy, Suspense } from "react";
const AvailableMeals = lazy(() => import('./Components/AvailableMeals'))
const Cart = lazy(() => import("./Components/Cart.jsx"));
const Checkout = lazy(() => import("./Components/Checkout.jsx"));
const Header = lazy(() => import("./Components/Header"));
const OrderPlaced = lazy(() => import("./Components/OrderPlaced.jsx"));
const LogIn = lazy(() => import("./Components/LogIn.jsx"));
const SingIn = lazy(() => import("./Components/SingIn.jsx"));
const Layout = lazy(() => import("./Components/Layout.jsx"));
const OrderHistory = lazy(() => import("./Components/OrderHistory.jsx"));
const ChangePass = lazy(() => import("./Components/ChangePass.jsx"));


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <SingIn />
          </Suspense>
        )
      },
      {
        path: "/login", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <LogIn />
          </Suspense>
        )
      },
      {
        path: "/meals", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <AvailableMeals />
          </Suspense>
        )
      },
      {
        path: "/cart", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: "/checkout", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <Checkout />
          </Suspense>
        )
      },
      {
        path: "/orderplaced", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <OrderPlaced />
          </Suspense>
        )
      },
      {
        path: "/orderHistory", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <OrderHistory />
          </Suspense>
        )
      },
      {
        path: "/changePass", element: (
          <Suspense fallback={<p>Loading.....</p>}>
            <ChangePass />
          </Suspense>
        )
      },
    ]
  },

])

function App() {
  return (
    <UserContextProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </UserContextProvider>
  );
}

export default App;
