
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import App from './App.jsx'
import Erro from "./pages/Erro";
import Mapa from "./pages/Mapa";
import GuiaCultural from "./pages/GuiaCultural";
import Eventos from "./pages/Eventos";
import Frases from "./pages/Frases";
import Sobrevivencia from "./pages/Sobrevivencia";
import Login from "./pages/Login";
import Roteiros from "./pages/Roteiros";



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([

  { path: "/", element: <App />,
    errorElement: <Erro />,
  },
  { path: "mapa", element: <Mapa /> },
  { path: "guiacultural", element: <GuiaCultural /> },
  { path: "sobrevivencia", element: <Sobrevivencia /> },
  { path: "eventos", element: <Eventos /> },
  { path: "roteiros", element: <Roteiros /> },
  { path: "frases", element: <Frases /> },
  { path: "login", element: <Login /> },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

