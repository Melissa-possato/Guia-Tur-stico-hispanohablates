import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CadastrarUsuario from "../componentes/CadastrarUsuario";
import LoginUsuario from "../componentes/LoginUsuario";

function Login() {

  const navigate = useNavigate();
  const [modoCadastro, setModoCadastro] = useState(false);

  const fazerLogin = async (usuario) => {

    try {

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      const data = await res.json();

      if (data.login) {

        alert("Login realizado!");
        navigate("/");

      } else {

        alert("Usuário ou senha incorretos");

      }

    } catch (erro) {

      console.log(erro);
      alert("Erro ao conectar com servidor");

    }

  };

  const cadastrarUsuario = async (usuario) => {

    const res = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    if (!res.ok) {
      alert("Erro ao cadastrar usuário");
      return;
    }

    alert("Usuário cadastrado!");
    setModoCadastro(false);

  };

  return (

    <div>

      <h2>Guia Turístico</h2>

      {modoCadastro ? (

        <CadastrarUsuario onAdd={cadastrarUsuario} />

      ) : (

        <LoginUsuario onLogin={fazerLogin} />

      )}

      <br />

      <button onClick={() => setModoCadastro(!modoCadastro)}>

        {modoCadastro ? "Já tenho conta" : "Criar conta"}

      </button>

    </div>

  );

}

export default Login;