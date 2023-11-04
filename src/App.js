import { useState } from "react";
import "./App.css";
import Usuarios from "./Usuarios.js";
import Snaps from "./Snaps.js";

function App() {
    const [page, setPage] = useState("users");
    return (
        <div className="App">
            <header className="App-header">
                <ul>
                    <li
                        onClick={() => {
                            setPage("snaps");
                        }}
                    >
                        Snaps
                    </li>
                    <li
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
