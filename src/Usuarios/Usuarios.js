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
        const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/users?pageNumber=0&pageCount=30&certificate=true";
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
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const Header = () => {
        return (
            <div className="usuario_header">
                <div>Is Admin</div>
                <div>User Name</div>
                <div>Description</div>
                <div>Location</div>
                <div>Cert.</div>
                <div></div>
            </div>
        );
    };

    const Xxxx = () => {
        if (selectedUser) {
            return <DetalleUser selectedUser={selectedUser} />;
        }
    };

    return (
        <main className="usuarios_main">
            <section className="listado">
                <Header />
                {users.map((user) => {
                    return <Usuario key={user.uid} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
                })}
            </section>
            <Xxxx />
        </main>
    );
};

export default Usuarios;
