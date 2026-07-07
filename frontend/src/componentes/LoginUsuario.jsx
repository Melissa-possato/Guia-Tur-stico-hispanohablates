import { useState } from "react";

export default function LoginUsuario({ onLogin }) {

   const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const[telefone, setTelefone] = useState("");
  const [paisOrigem, setPaisOrigem] = useState("");
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!nome || !senha || !email || !telefone || !paisOrigem) {
      alert("Preencha todos os campos");
      return;
    }

    onLogin({
        nome_usuario: nomeUsuario,
        telefone: telefone,
        email: email,
        paisOrigem: paisOrigem,
        senha: senha
    });

  };

  return (

    <form onSubmit={handleSubmit}>

      <h3>Login</h3>

       <input
              type="text"
              placeholder="Nombre de usuario"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="teléfono"
              value={String}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
  
            <input
              type="email"
              placeholder="País natal"
              value={String}
              onChange={(e) => setPaisOrigem(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
  
            <input
              type="password"
              placeholder="Contraseña"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

      <button type="submit">
        Entrar
      </button>

    </form>

  );

}
