import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Define global interface for the Window object.
// This is to be able to 
declare global {
    interface Window {
        splunkjs: any;
        define: any;
        require: any;
        requirejs: any;
        searchManager: any;
        results: any;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);