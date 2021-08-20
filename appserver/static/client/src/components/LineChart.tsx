import React, { useEffect } from "react";
import { ChartView, searchId } from "../util/searchUtil";

const LineChart = () => {

    useEffect(() => {
        const chartId = "pie-chart";
        window.splunkjs.mvc.Components
                .revokeInstance(chartId);
        new ChartView({
            id: chartId,
            managerid: searchId,
            type: "line",
            "charting.chart.showPercent": true,
            el: window.$("#line-chart")
        }).render();
    }, []);

    return (
        <div className="panel-body">
            <div id="line-chart"></div>
        </div>
    );
}

export default LineChart;
