import { Link } from "react-router-dom"

function Frases(props) {

    return (
        <>
            <h1>Frases</h1>
            <p>Podemos voltar por um "hard link" - algo estático</p>
            #teste
            <Link to={"/"}>Voltar para a página inicial</Link>
        </>
    )
}

export default Frases