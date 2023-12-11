import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const LoggedEmail = () => {
    const [data, setData] = useState();

    const fetchData = async () => {
        const token = await auth.currentUser.getIdToken();
        const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/metrics/users/logged/email";
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
        title: "Usuarios Loggeados con E-mail",
        chartArea: { width: "80%" },
        hAxis: {
            title: "Fecha",
            minValue: 0,
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

export default LoggedEmail;
