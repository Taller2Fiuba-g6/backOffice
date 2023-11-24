import { useState } from "react";

const Usuario = ({ user, selectedUser, setSelectedUser }) => {
    const [isAdmin, setIsAdmin] = useState(user.is_admin);
    const [blocked, setBlocked] = useState(false);

    const onSelect = () => {
        setSelectedUser(user);
    };

    const bloquear = () => {
        setBlocked(!blocked);
    };

    const setAdmin = () => {
        setIsAdmin(!isAdmin);
    };

    const AdminBox = () => {
        if (isAdmin) {
            return <input onChange={setAdmin} id={user.uid} type="checkbox" defaultChecked />;
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
        <div className={clase}>
            <div className="usuario_admin">
                <AdminBox />
            </div>
            <div className="usuario_username">{user.username}</div>
            <div className="usuario_description">{user.profile_description}</div>
            <div className="usuario_location">{user.location}</div>
            <div className="div_boton">
                <button className="boton" onClick={onSelect}>
                    Ver
                </button>
            </div>
            <div className="div_boton">
                <BotonBloqueo />
            </div>
        </div>
    );
};

export default Usuario;
