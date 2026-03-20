import { Link } from "react-router-dom"

function Sobrevivencia(props) {

    return (
        <>
            <h1>Sobrevivência </h1>
            <p>Podemos voltar por um "hard link" - algo estático</p>
            <Link to={"/"}>Voltar para a página inicial</Link>
        </>
    )
}

export default Sobrevivencia