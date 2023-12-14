import { useState } from "react";
import { auth } from "../firebaseConfig";

const Usuario = ({ user, selectedUser, setSelectedUser }) => {
    const [isAdmin, setIsAdmin] = useState(user.is_admin);
    const [blocked, setBlocked] = useState(user.is_blocked);
    const [certified, setCertified] = useState(user.certified);

    const handleSelect = () => {
        setSelectedUser(user);
    };

    const setAdmin = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/" + user.uid;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (response.ok) {
                setIsAdmin(true);
                setSelectedUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const bloquear = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/users/" + user.uid;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (response.ok) {
                setBlocked(true);
                setSelectedUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const unsetAdmin = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            // const url = "/admin/" + user.uid;
            const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/" + user.uid;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (response.ok) {
                setIsAdmin(false);
                setSelectedUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const desBloquear = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            // const url = "/admin/users/" + user.uid;
            const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/users/" + user.uid;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (response.ok) {
                setBlocked(false);
                setSelectedUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAprobar = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/certify/users?user_id=" + selectedUser.uid;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (response.ok) {
                setCertified("done");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRevocar = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/certify/users?user_id=" + selectedUser.uid;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            if (response.ok) {
                setCertified(false);
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
                <button className="boton bloqueado" onClick={desBloquear}>
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

    const BotonCertificar = () => {
        if (certified === "done") {
            return (
                <button className="boton bloqueado" onClick={handleRevocar}>
                    Revocar
                </button>
            );
        } else {
            if (certified === "pending") {
                return (
                    <button className="boton" onClick={handleAprobar}>
                        Certificar
                    </button>
                );
            }
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
            <div>
                <AdminBox />
            </div>
            <div onClick={handleSelect} className="usuario_username">
                {user.username}
            </div>
            <div onClick={handleSelect} className="usuario_description">
                {user.profile_description}
            </div>
            <div onClick={handleSelect} className="usuario_location">
                {user.location}
            </div>
            <div>
                <BotonCertificar />
            </div>
            <div>
                <BotonBloqueo />
            </div>
        </div>
    );
};

export default Usuario;
