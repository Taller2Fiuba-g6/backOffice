import { useState } from "react";
import Login from "./Login";
import MainPage from "./MainPage";

function App() {
    const [logged, setLogged] = useState(false);
    if (logged) {
        return <MainPage />;
    } else {
        return <Login setLogged={setLogged} />;
    }
}

export default App;
