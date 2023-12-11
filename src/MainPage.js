import { useState } from "react";
// import "./App.css";
import Usuarios from "./Usuarios/Usuarios.js";
import Snaps from "./Snaps/Snaps.js";
import Menu from "./Menu.js";
import UsersMetrics from "./UsersMetrics/UsersMetrics.js";
import SnapsMetrics from "./SnapsMetrics/SnapsMetrics.js";

const MainPage = () => {
    const [page, setPage] = useState("snaps");
    return (
        <div className="App">
            <Menu setPage={setPage} />
            <>
                {page === "snaps" && <Snaps />}
                {page === "users" && <Usuarios />}
                {page === "usersmetrics" && <UsersMetrics />}
                {page === "snapsmetrics" && <SnapsMetrics />}
            </>
        </div>
    );
};

export default MainPage;
