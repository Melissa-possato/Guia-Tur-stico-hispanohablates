import { Link } from "react-router-dom"

function GuiaCultural(props) {

    return (
        <>
            <h1>Guia Cultural</h1>
            <p>Podemos voltar por um "hard link" - algo estático</p>
            <Link to={"/"}>Voltar para a página inicial</Link>
        </>
    )
}

export default GuiaCultural