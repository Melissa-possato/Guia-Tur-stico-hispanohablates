import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    
    // Aqui você enviaria para a rota POST /usuarios do seu Node.js
    console.log("Cadastrando:", { nome, email, senha });
    
    alert("Conta criada com sucesso!");
    navigate("/"); // Volta para o login
  };

  return (
    <div >
      <form onSubmit={handleCadastro} >
        <h2>Criar Conta</h2>
        <input type="text" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)}  required /> 
        <br />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required /> 
        <br />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <br />
        
        <button type="submit" >Finalizar Cadastro</button>
        <br />
        <Link to={"../login"}> Já possuo cadastro </Link>
      </form>
    </div>
  );
}



export default cadastro;
