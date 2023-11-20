const Snap = ({ snap, token, setSelectedSnap }) => {
    const bloquear = async () => {
        try {
            const url = "/admin/snaps/" + snap.msgID;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const status = response.status;
            console.log(status);
        } catch (error) {
            console.error(error);
        }
    };

    const onSelect = () => {
        setSelectedSnap(snap);
    };

    return (
        <div className="snap">
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
                <button className="boton" onClick={bloquear}>
                    Bloquear
                </button>
            </div>
        </div>
    );
};

export default Snap;
