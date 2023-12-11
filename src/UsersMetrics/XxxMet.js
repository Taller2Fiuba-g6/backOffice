import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const XxxMet = () => {
    const [data, setData] = useState();

    const getXXX = async () => {
        const token = await auth.currentUser.getIdToken();
        // const url = "https://snap-middle-end-qjub62maia-wl.a.run.app/admin/users";
        const url = "./datos2.json";
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
        getXXX();
    }, []);

    return (
        <div className="chart_div">
            <Chart chartType="ColumnChart" data={data} width="100%" height="400px" legendToggle />
        </div>
    );
};

export default XxxMet;
