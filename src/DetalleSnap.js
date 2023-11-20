const DetalleSnap = ({ selectedSnap }) => {
    if (typeof selectedSnap !== "undefined") {
        return (
            <section className="detalle_snap">
                <div className="detalle_snap_texto">{selectedSnap.msgText}</div>
                <picture className="detalle_snap_picture">
                    <img src={selectedSnap.images[0]} alt="" />
                </picture>
            </section>
        );
    }
};

export default DetalleSnap;
