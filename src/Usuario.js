const Usuario = (user) => {
    const onSelect = () => {};

    const bloquear = () => {};

    return (
        <div className="usuario">
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
