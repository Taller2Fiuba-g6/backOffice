import { useState } from "react";
// import "./App.css";
import Usuarios from "./Usuarios.js";
import Snaps from "./Snaps.js";

function App() {
    const [page, setPage] = useState("users");
    return (
        <div className="App">
            <header className="header">
                <div className="logo">SnapMsg</div>
                <ul className="menu">
                    <li
                        className="menu_item"
                        onClick={() => {
                            setPage("snaps");
                        }}
                    >
                        Snaps
                    </li>
                    <li
                        className="menu_item"
                        onClick={() => {
                            setPage("users");
                        }}
                    >
                        Usuarios
                    </li>
                </ul>
            </header>
            <main>
                {page == "snaps" && <Snaps />}
                {page == "users" && <Usuarios />}
            </main>
        </div>
    );
}

export default App;
