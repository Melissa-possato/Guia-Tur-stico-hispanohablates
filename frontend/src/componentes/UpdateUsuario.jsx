import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateUsuario() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem("usuarioId"); 
  const [formData, setFormData] = useState({
    nome_usuario: "",
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/update/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      // Primeiro verificamos se a resposta é JSON antes de converter
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        
        if (response.ok) {
          alert("Dados atualizados com sucesso!");
          if (formData.nome_usuario) {
            localStorage.setItem("nomeUsuario", formData.nome_usuario);
          }
          navigate("/login");
        } else {
          alert(data.error || "Erro ao atualizar dados.");
        }
      } else {
        // Se cair aqui, o servidor mandou um erro em texto/HTML (como o erro 500)
        const textError = await response.text();
        console.error("Erro do servidor (não JSON):", textError);
        alert("Erro interno no servidor. Verifique o terminal do Node.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor. Ele está rodando na porta 5000?");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Atualizar Meus Dados</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome_usuario"
          placeholder="Novo nome de usuário"
          value={formData.nome_usuario}
          onChange={handleChange}
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Novo email"
          value={formData.email}
          onChange={handleChange}
        /><br /><br />
        <input
          type="password"
          name="senha"
          placeholder="Nova senha"
          value={formData.senha}
          onChange={handleChange}
        /><br /><br />
        <button type="submit">Salvar Alterações</button>
      </form>
      <br />
      <button onClick={() => navigate("/login")}>Voltar</button>
    </div>
  );
}

export default UpdateUsuario;
