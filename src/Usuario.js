import { useState } from "react";

const Usuario = ({ user, token, selectedUser, setSelectedUser }) => {
    console.log(user);
    const [isAdmin, setIsAdmin] = useState(user.is_admin);
    const onSelect = () => {
        setSelectedUser(user);
    };

    const bloquear = () => {};

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

    return (
        <div className="usuario">
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
                <button className="boton" onClick={bloquear}>
                    Bloquear
                </button>
            </div>
        </div>
    );
};

export default Usuario;
