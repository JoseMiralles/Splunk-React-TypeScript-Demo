import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./model/store";

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
        $: any;
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);