import React from "react";

const App: React.FC = () => {

    window.requirejs([
        "splunkjs/mvc/searchmanager",
        "splunkjs/mvc/simplexml/ready!"
    ], function(Searchmanager: any){
        window.searchManager = new Searchmanager({
            id: "example-search",
            earliest_time: "-5h@y",
            latest_time: "now",
            preview: true,
            cache: false,
            search: "index=airbnb Beds>3"
        });
        const obj = window.searchManager.data("results");
        window.searchManager.on("search:done", function(state: any, job: any){

            if (state.content.resultCount === 0) console.log("No results");
            else {
                job.fetch(function (err: any) {
                    job.results({}, function (err: any, results: any) {
                        window.results = results;
                        const fields: String[] = results.fields;
                        const rows: String[][] = results.rows;

                        console.log(fields);
                        rows.forEach(r => console.log(r));
                    });
                });
            }

        });
    });

    return <h1>Hello Splunk!</h1>;

};

export default App;