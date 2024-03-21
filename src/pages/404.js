import foto from "./404.png"
import "./404.css"

const Error404 = () => {
    return (
        <div className="container-404">
            <img className="foto-404" src={foto} alt="404" />
            <h2>Halaman Tidak Ditemukan</h2>
        </div>
    )
}

export default Error404