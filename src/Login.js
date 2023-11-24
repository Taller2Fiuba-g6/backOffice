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
        // setIsLoading(true);
        signInWithEmailAndPassword(auth, user.current.value, password.current.value)
            .then(() => {
                // console.log("uid:", auth.currentUser.uid);
                // console.log("email:", auth.currentUser.email);
                // console.log("AccessToken:", auth.currentUser.stsTokenManager.accessToken);
                setLogged(true);
            })
            .catch((error) => {
                // setIsLoading(false);
                showFirebaseError(error);
            });
        // setIsLoading(false);
    };

    return (
        <main className="login">
            <div>
                Usuario:
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
