const DetalleUser = ({ selectedUser }) => {
    if (typeof selectedUser !== "undefined") {
        return (
            <section className="detalle_user">
                <h2>Cover Photo:</h2>
                <picture className="detalle_user_picture">
                    <img src={selectedUser.coverPhoto} alt="" />
                </picture>
                <h2>Profile Photo:</h2>
                <picture className="detalle_user_picture">
                    <img className="detalle_user_img" src={selectedUser.profilePhoto} alt="" />
                </picture>
            </section>
        );
    }
};

export default DetalleUser;
