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
            <input type="file" accept=".xlx,.xls" onChange={onChangeHandler} />
        </div>
    );
};

export default App;
