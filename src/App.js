import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

const App = () => {
    const [data, setData] = useState([]);

    //handler function
    const onChangeHandler = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
    };
    return (
        <div className="App">
            <h2> Fetch Excel file data and display </h2>
            <input type="file" accept=".xlsx,.xls" onChange={onChangeHandler} />
            {/* display data */}
            {data.length > 0 && (
                <table className="table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((elem, index) => (
                            <tr key={index}>
                                {Object.values(elem).map((val, index) => (
                                    <td key={index}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
