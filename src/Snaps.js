import Snap from "./Snap";
import DetalleSnap from "./DetalleSnap";
import { useEffect, useState } from "react";

const Snaps = () => {
    const [snaps, setSnaps] = useState([]);
    const [token, setToken] = useState();
    const [selectedSnap, setSelectedSnap] = useState();

    useEffect(() => {
        login();
    }, []);

    useEffect(() => {
        token && getSnaps();
    }, [token]);

    // useEffect(() => {}, [selectedSnap]);

    const login = async () => {
        const url =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAJHVj9xf0L8b0Ub0gBP34t5fhdFYk5uRs";
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                email: "hhuzan@gmail.com",
                password: "fiuba2023",
                returnSecureToken: true,
            }),
            headers: {
                accept: "application/json",
            },
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setToken(data.idToken);
        } catch (error) {
            console.log(error);
        }
    };

    const getSnaps = async () => {
        const url = "/admin/snaps?pageNumber=0&pageCount=200";
        const requestOptions = {
            // mode: "no-cors",
            method: "GET",
            headers: {
                Authorization: token,
                accept: "application/json",
            },
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            setSnaps(data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="snaps_main">
            <section className="listado">
                {snaps.map((snap) => {
                    return <Snap snap={snap} token={token} setSelectedSnap={setSelectedSnap} />;
                })}
            </section>
            <section>
                <DetalleSnap selectedSnap={selectedSnap} />
            </section>
        </main>
    );
};

export default Snaps;
