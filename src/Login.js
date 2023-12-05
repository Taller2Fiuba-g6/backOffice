import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";

const Login = ({ setLogged }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const user = useRef(null);
    const password = useRef(null);

    const showFirebaseError = (error) => {
        switch (error.code) {
            case "auth/email-already-in-use":
                setErrorMessage("Email en uso.");
                break;
            case "auth/weak-password":
                setErrorMessage("La password debe tener al menos 6 caracteres.");
                break;
            case "auth/invalid-email":
                setErrorMessage("Email no válido.");
                break;
            case "auth/missing-email":
                setErrorMessage("Falta e-mail.");
                break;
            case "auth/missing-password":
                setErrorMessage("Falta password.");
                break;
            case "auth/invalid-login-credentials":
                setErrorMessage("Email o password inválidos.");
                break;
            default:
                setErrorMessage(error.message);
                console.error(error.code);
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, user.current.value, password.current.value)
            .then(() => {
                // console.log("uid:", auth.currentUser.uid);
                // console.log("email:", auth.currentUser.email);
                // console.log("AccessToken:", auth.currentUser.stsTokenManager.accessToken);
                loginAPI();
            })
            .catch((error) => {
                showFirebaseError(error);
            });
    };

    const loginAPI = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const url = "https://snap-middle-end-qjub62maia-ue.a.run.app/login";
            // const url = "/login";
            const requestOptions = {
                // mode: "no-cors",
                method: "GET",
                headers: {
                    Authorization: token,
                    accept: "application/json",
                },
            };
            const response = await fetch(url, requestOptions);
            // console.log("loginAPI: ", response.status);
            if (response.status === 404) {
                setErrorMessage("Usuario/Password No Válido");
            } else if (response.ok) {
                const json = await response.json();
                if (json.is_admin) {
                    setLogged(true);
                } else {
                    // setLogged(true);
                    setErrorMessage("Usuario/Password No Válido");
                }
            } else {
                setErrorMessage("Server Error/Status: " + response.status);
            }
        } catch (error) {
            if (error.message === "Network request failed") setErrorMessage("Error de Red. Falló el requerimiento.");
            else setErrorMessage(error.message);
        }
    };

    return (
        <>
            <header className="header">
                <div className="logo">SnapMsg</div>
            </header>
            <main className="login">
                <div className="login_field">
                    E-mail:
                    <input ref={user} />
                </div>
                <div className="login_field">
                    Password:
                    <input type="password" ref={password} />
                </div>
                <button onClick={handleLogin}>Login</button>
                <p className="login_error">{errorMessage}</p>
            </main>
        </>
    );
};

export default Login;
