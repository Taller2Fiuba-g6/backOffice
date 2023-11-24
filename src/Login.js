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
            const headers = { Authorization: token };
            // const url = "https://snap-middle-end-qjub62maia-ue.a.run.app/login";
            const url = "/login";
            const response = await fetch(url, { headers });
            // console.log("loginAPI: ", response.status);
            if (response.status === 404) {
                setErrorMessage("Usuario/Password No Válido");
            } else if (response.ok) {
                const json = await response.json();
                console.log(json);
                //TODO: agregar chequeo de respuesta !!!!!!!!!
                setLogged(true);
            } else {
                setErrorMessage("Server Error/Status: " + response.status);
            }
        } catch (error) {
            if (error.message === "Network request failed") setErrorMessage("Error de Red. Falló el requerimiento.");
            else setErrorMessage(error.message);
        }
    };

    return (
        <main className="login">
            <div>
                E-mail:
                <input ref={user} />
            </div>
            <div>
                Password:
                <input ref={password} />
            </div>
            <button onClick={handleLogin}>Login</button>
            <p className="login_error">{errorMessage}</p>
        </main>
    );
};

export default Login;
