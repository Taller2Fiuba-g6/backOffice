import { useState } from "react";
import { auth } from "../firebaseConfig";

const Snap = ({ snap, selectedSnap, setSelectedSnap }) => {
    const [blocked, setBlocked] = useState(snap.blocked);

    const bloquear = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "/admin/snaps/" + snap.msgID;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            setBlocked(!blocked);
        } catch (error) {
            console.error(error);
        }
    };

    const onSelect = () => {
        setSelectedSnap(snap);
    };

    let clase = "snap";
    if (typeof selectedSnap !== "undefined") {
        if (snap.msgID === selectedSnap.msgID) {
            clase = "snap seleccionado";
        }
    }

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

    return (
        <div className={clase}>
            <div className="snap_datetime">{snap.dateTime}</div>
            <div className="snap_username">{snap.username}</div>
            <div className="snap_msgtext">{snap.msgText}</div>
            <div className="snap_lbl_img">{snap.images[0] && "img"}</div>
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

export default Snap;
