import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { store } from "./store/store.js";
import { persist } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persist} loading={null}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </PersistGate>
  </Provider>
);
