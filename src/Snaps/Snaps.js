import Snap from "./Snap";
import DetalleSnap from "./DetalleSnap";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const Snaps = () => {
    const [snaps, setSnaps] = useState([]);
    const [selectedSnap, setSelectedSnap] = useState();

    useEffect(() => {
        getSnaps();
    }, []);

    const getSnaps = async () => {
        const token = await auth.currentUser.getIdToken();
        // const url = "/admin/snaps?pageNumber=0&pageCount=200";
        const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/snaps?pageNumber=0&pageCount=200";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: token,
                accept: "application/json",
            },
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setSnaps(data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="snaps_main">
            <section className="listado">
                {snaps.map((snap) => {
                    return <Snap key={snap.msgID} snap={snap} selectedSnap={selectedSnap} setSelectedSnap={setSelectedSnap} />;
                })}
            </section>
            <DetalleSnap selectedSnap={selectedSnap} />
        </main>
    );
};

export default Snaps;
