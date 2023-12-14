const DetalleUser = ({ selectedUser }) => {
    const Cert = () => {
        if (selectedUser.certified) {
            return (
                <div className="certificado">
                    <h2>Certificate Request:</h2>
                    <p>{selectedUser.text}</p>
                    <picture className="certified_picture">
                        <img className="certified_img" src={selectedUser.documents[0]} alt="" />
                    </picture>
                </div>
            );
        }
    };

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
                <Cert />
            </section>
        );
    }
};

export default DetalleUser;
