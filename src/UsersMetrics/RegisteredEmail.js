import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const RegisteredEmail = () => {
    const [data, setData] = useState([
        ["_", "_", "_"],
        ["", 0, 0],
    ]);

    const fetchData = async () => {
        const token = await auth.currentUser.getIdToken();
        const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/metrics/users/registered/email";
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
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        title: "Usuarios Registrados/Fallidos con E-mail",
        chartArea: { width: "80%" },
        colors: ["green", "firebrick"],
        hAxis: {
            title: "Fecha",
            minValue: 0,
            direction: -1,
        },
        vAxis: {
            title: "Usuarios",
        },
        legend: "none",
    };

    return (
        <div className="chart_div">
            <Chart chartType="ColumnChart" data={data} options={options} width="100%" height="400px" legendToggle />
        </div>
    );
};

export default RegisteredEmail;
