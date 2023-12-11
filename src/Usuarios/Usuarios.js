import Usuario from "./Usuario";
import { useEffect, useState } from "react";
import DetalleUser from "./DetalleUser";
import { auth } from "../firebaseConfig";

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const token = await auth.currentUser.getIdToken();
        // const url = "/admin/users";
        const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/users?pageNumber=0&pageCount=15&certificate=true";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: token,
                accept: "application/json",
            },
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const Header = () => {
        return (
            <div className="usuario_header">
                <div className="usuario_admin">Is Admin</div>
                <div className="usuario_username">User Name</div>
                <div className="usuario_description">Description</div>
                <div className="usuario_location">Location</div>
                <div className="usuario_certified">Cert.</div>
                <div className="div_boton"></div>
            </div>
        );
    };

    return (
        <main className="usuarios_main">
            <section className="listado">
                <Header />
                {users.map((user) => {
                    return <Usuario key={user.uid} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
                })}
            </section>
            <DetalleUser selectedUser={selectedUser} />
        </main>
    );
};

export default Usuarios;
