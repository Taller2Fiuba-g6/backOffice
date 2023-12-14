import { useState } from "react";
import { auth } from "../firebaseConfig";

const DetalleUser = ({ selectedUser }) => {
    const [certified, setCertified] = useState(selectedUser.certified);

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

    const AprobCert = () => {
        if (certified === "pending") {
            return <button onClick={handleAprobar}>Aprobar</button>;
        }
        if (certified === "done") {
            return <button onClick={handleRevocar}>Revocar</button>;
        }
    };

    const Cert = () => {
        if (selectedUser.certified) {
            return (
                <div className="certificado">
                    <h2>Certificate Request:</h2>
                    <p>{selectedUser.text}</p>
                    <picture className="certified_picture">
                        <img className="certified_img" src={selectedUser.documents[0]} alt="" />
                    </picture>
                    <AprobCert />
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
