import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function UpdateUsuario() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("usuarioId");

  const [formData, setFormData] = useState({
    campus: "",
    nome: "",
    nome_usuario: "",
    telefone: "",
    email: "",
    paisOrigem: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/update/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (response.ok) {
          alert("¡Datos actualizados con éxito!");

          if (formData.nome_usuario) {
            localStorage.setItem("nomeUsuario", formData.nome_usuario);
          }

          navigate("/login");
        } else {
          alert(data.error || "Error al actualizar los datos.");
        }
      } else {
        const textError = await response.text();
        console.error("Erro do servidor:", textError);
        alert("Erro interno no servidor. Verifique o terminal do Node.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-card">

          <h2>Actualizar Cuenta</h2>

          <p className="login-subtitulo">
            Actualiza tus datos personales de forma segura.
          </p>

          <form onSubmit={handleSubmit} className="login-form">

          
            <input
              type="text"
              name="nome_usuario"
              placeholder="Nuevo nombre de usuario"
              value={formData.nome_usuario}
              onChange={handleChange}
            />

            <input
              type="text"
              name="telefone"
              placeholder="Nuevo teléfono"
              value={formData.telefone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Nuevo correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="paisOrigem"
              placeholder="Nuevo país de origen"
              value={formData.paisOrigem}
              onChange={handleChange}
            />

            <input
              type="password"
              name="senha"
              placeholder="Nueva contraseña"
              value={formData.senha}
              onChange={handleChange}
            />

            <button type="submit">
              Guardar Cambios
            </button>

          </form>

          <button
            onClick={() => navigate("/login")}
            className="btn-cadastro"
            style={{ marginTop: "20px" }}
          >
            Volver
          </button>

        </div>
      </div>
    </div>
  );
}

export default UpdateUsuario;
