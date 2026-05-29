import { Link, Outlet, useNavigate } from "react-router-dom";

import { FaMapMarkedAlt, FaUserCircle } from "react-icons/fa";

import { useEffect, useState } from "react";

import "../App.css";

function Layout() {

  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const nomeSalvo = localStorage.getItem("nomeUsuario");

    if (token && nomeSalvo) {
      setUsuario({ nome: nomeSalvo });
    }

  }, []);

  return (
    <>

      {/* NAVBAR */}
      <header className="navbar">

        <h2 className="icon green">

          <FaMapMarkedAlt />

          Guia Turístico

        </h2>

        <nav>

          <Link to="/mapa">Mapa</Link>

          <Link to="/sobrevivencia">
            Sobrevivência
          </Link>

          <Link to="/frases">
            Frases
          </Link>

          <Link to="/guiacultural">
            Guia Cultural
          </Link>

          <Link to="/roteiros">
            Roteiros
          </Link>

          <Link to="/eventos">
            Eventos
          </Link>

          {usuario ? (

            <button
              className="perfil-btn"
              onClick={() => navigate("/login")}
            >

              <FaUserCircle color="white" />

            </button>

          ) : (

            <Link
              to="/login"
              className="login-btn"
            >

              Login

            </Link>

          )}

        </nav>

      </header>

      {/* PÁGINAS */}
      <div style={{ paddingTop: "70px" }}>
        <Outlet />
      </div>

    </>
  );
}

export default Layout;