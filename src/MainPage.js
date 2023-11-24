import { useState } from "react";
// import "./App.css";
import Usuarios from "./Usuarios/Usuarios.js";
import Snaps from "./Snaps/Snaps.js";
import Menu from "./Menu.js";

const MainPage = () => {
    const [page, setPage] = useState("snaps");
    return (
        <div className="App">
            <Menu setPage={setPage} />
            <main>
                {page === "snaps" && <Snaps />}
                {page === "users" && <Usuarios />}
            </main>
        </div>
    );
};

export default MainPage;
