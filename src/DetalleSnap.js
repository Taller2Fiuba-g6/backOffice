const DetalleSnap = ({ selectedSnap }) => {
    if (typeof selectedSnap !== "undefined") {
        return (
            <div>
                <div>{selectedSnap.msgText}</div>
                <picture>
                    <img className="detalle_snap_img" src={selectedSnap.images[0]} alt="" />
                </picture>
            </div>
        );
    }
};

export default DetalleSnap;
