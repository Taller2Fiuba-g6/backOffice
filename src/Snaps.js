import Snap from "./Snap";
import { useEffect, useState } from "react";

const Snaps = () => {
    const [snaps, setSnaps] = useState([]);
    const [token, setToken] = useState();

    useEffect(() => {
        login();
    }, []);

    useEffect(() => {
        token && getSnaps();
    }, [token]);

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
        const url = "/snaps?pageNumber=0&pageCount=50";
        // const url = "https://snap-middle-end-qjub62maia-ue.a.run.app/snaps";
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
        <>
            {snaps.map((snap) => {
                return <Snap key={snap.msgID} {...snap} />;
            })}
        </>
    );
};

export default Snaps;
