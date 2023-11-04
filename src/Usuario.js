const Usuario = (user) => {
    return (
        <div className="usuario">
            <div className="xxx">{user.username}</div>
            <div className="xxx">{user.profile_description}</div>
            <div className="xxx">{user.location}</div>
        </div>
    );
};

export default Usuario;
