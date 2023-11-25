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
        const url = "/admin/users";
        // const url = "https://snap-middle-end-qjub62maia-ue.a.run.app/admin/users";
        const requestOptions = {
            // mode: "no-cors",
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

    return (
        <main className="usuarios_main">
            <section className="listado">
                {users.map((user) => {
                    return <Usuario key={user.uid} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
                })}
            </section>
            <DetalleUser selectedUser={selectedUser} />
        </main>
    );
};

export default Usuarios;
