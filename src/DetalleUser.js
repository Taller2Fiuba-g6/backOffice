const DetalleUser = ({ selectedUser }) => {
    if (typeof selectedUser !== "undefined") {
        return (
            <section className="detalle_user">
                <picture className="detalle_user_picture">
                    <img src={selectedUser.coverPhoto} alt="" />
                </picture>
                <picture className="detalle_user_picture">
                    <img src={selectedUser.profilePhoto} alt="" />
                </picture>
            </section>
        );
    }
};

export default DetalleUser;
