import Usuario from "./Usuario";
import { useEffect, useState } from "react";

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState();

    useEffect(() => {
        login();
    }, []);

    useEffect(() => {
        token && getUsers();
    }, [token]);

    const login = async () => {
        const url =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAJHVj9xf0L8b0Ub0gBP34t5fhdFYk5uRs";
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                email: "hhuzan@gmail.com",
                password: "fiuba2023",
                returnSecureToken: true,
            }),
            headers: {
                accept: "application/json",
            },
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setToken(data.idToken);
        } catch (error) {
            console.log(error);
        }
    };

    const getUsers = async () => {
        const url = "/users";
        // const url = "https://snap-middle-end-qjub62maia-ue.a.run.app/users";
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
                    return <Usuario key={user.uid} {...user} />;
                })}
            </section>
        </main>
    );
};

export default Usuarios;
