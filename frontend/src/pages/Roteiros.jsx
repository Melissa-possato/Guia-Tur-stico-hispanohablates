import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o navigate para redirecionar se não houver token
import RoteirosForm from "../componentes/RoteirosForm";

function Roteiros() {
  const [roteiros, setRoteiros] = useState([]);
  const navigate = useNavigate();

  // roteiros prontos
  const roteirosProntos = [

    {
      id_roteiro: "p1",
      titulo: "Roteiro Natureza",
      descricao: "Passeio pelos parques mais bonitos de São Carlos.",
      duracao_horas: 3,
      dificuldade: "Fácil",
      categoria: "Natureza",
      preco_estimado: "Grátis"
    },

    {
      id_roteiro: "p2",
      titulo: "Roteiro Cultural",
      descricao: "Conheça museus e pontos históricos da cidade.",
      duracao_horas: 2,
      dificuldade: "Fácil",
      categoria: "Cultura",
      preco_estimado: "R$10"
    },

    {
      id_roteiro: "p3",
      titulo: "Roteiro Universitário",
      descricao: "Explore os famosos campus universitários da cidade.",
      duracao_horas: 2,
      dificuldade: "Fácil",
      categoria: "Educação",
      preco_estimado: "Grátis"
    }

  ];

  // buscar roteiros do banco
 const carregarRoteiros = async () => {
    // 1. BUSCAMOS O TOKEN QUE SALVAMOS NO LOGIN
    const token = localStorage.getItem("token");

    // OPCIONAL: Se não tiver token, nem tenta buscar e manda pro login
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // 2. CORRIGIMOS A URL (Porta 3000 do Node)
      const res = await fetch("http://localhost:3000/roteiro", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 3. ENVIAMOS O TOKEN PARA O MIDDLEWARE VALIDAR
          "x-access-token": token 
        }
      });

      // 4. SE O TOKEN FOR INVÁLIDO (ERRO 401 ou 403), DESLOGA O USUÁRIO
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setRoteiros(data);

    } catch (error) {
      console.error("Erro ao carregar roteiros:", error);
      setRoteiros([]);
    }
  };

  useEffect(() => {
    carregarRoteiros();
  }, []);

  return (

    <div>

      <h1>Roteiros Turísticos</h1>

      <RoteirosForm atualizar={carregarRoteiros} />

      <h2>Roteiros disponíveis</h2>

      {[...roteirosProntos, ...roteiros].map((r) => (

        <div key={r.id_roteiro} style={{
          border:"1px solid #ccc",
          padding:"10px",
          margin:"10px",
          borderRadius:"8px"
        }}>

          <h3>{r.titulo}</h3>

          <p>{r.descricao}</p>

          <p>Duração: {r.duracao_horas} horas</p>

          <p>Dificuldade: {r.dificuldade}</p>

          <p>Categoria: {r.categoria}</p>

          <p>Preço estimado: {r.preco_estimado}</p>

        </div>

      ))}

    </div>

  );

}

export default Roteiros;