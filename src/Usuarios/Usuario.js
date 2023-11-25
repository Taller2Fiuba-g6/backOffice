import { useState } from "react";
import { auth } from "../firebaseConfig";

const Usuario = ({ user, selectedUser, setSelectedUser }) => {
    const [isAdmin, setIsAdmin] = useState(user.is_admin);
    const [blocked, setBlocked] = useState(false);

    const handleSelect = () => {
        setSelectedUser(user);
    };

    const bloquear = () => {
        setBlocked(!blocked);
    };

    const setAdmin = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "/admin/users/" + user.uid;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            console.log(response.status);
            if (response.ok) {
                setIsAdmin(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const unsetAdmin = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "/admin/users/" + user.uid;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            console.log(response.status);
            if (response.ok) {
                setIsAdmin(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const AdminBox = () => {
        if (isAdmin) {
            return <input onChange={unsetAdmin} id={user.uid} type="checkbox" defaultChecked />;
        } else {
            return <input onChange={setAdmin} id={user.uid} type="checkbox" />;
        }
    };

    const BotonBloqueo = () => {
        if (blocked) {
            return (
                <button className="boton bloqueado" onClick={bloquear}>
                    Desbloquear
                </button>
            );
        } else {
            return (
                <button className="boton" onClick={bloquear}>
                    Bloquear
                </button>
            );
        }
    };

    let clase = "usuario";
    if (typeof selectedUser !== "undefined") {
        if (user.uid === selectedUser.uid) {
            clase = "usuario seleccionado";
        }
    }

    return (
        <div onClick={handleSelect} className={clase}>
            <div className="usuario_admin">
                <AdminBox />
            </div>
            <div className="usuario_username">{user.username}</div>
            <div className="usuario_description">{user.profile_description}</div>
            <div className="usuario_location">{user.location}</div>
            <div className="div_boton">
                <BotonBloqueo />
            </div>
        </div>
    );
};

export default Usuario;
