import { IListing } from "../model/listingsModel";

export interface ITable {
    fields: string[],
    rows: string[][]
}

export let SearchManager: any;
export let ChartView: any;

window.requirejs([
    "splunkjs/ready!",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/chartview"
], (mvc: any) => {
    SearchManager = window.requirejs("splunkjs/mvc/searchmanager");
    ChartView = window.requirejs("splunkjs/mvc/chartview");
});

export const searchId = "listings-search";
/**
 * Gets all of the listings which are minBeds < listing > maxBeds
 */
export const performSearch = async (
    minBeds: number,
    maxBeds: number,
    count: number
): Promise<ITable> => {
    return new Promise(async (resolve, reject) => {

        await window.splunkjs.mvc.Components
        .revokeInstance(searchId);

        if (!SearchManager) {
            // The SearchManager constructor is loaded asynchronously.
            // So check if it is already loaded.
            alert("The search manager constructor is still loading!");
            resolve({
                fields: [],
                rows: []
            });
        }

        const searchManager = new SearchManager({
            id: searchId,
            earliest_time: "-5h@y",
            latest_time: "now",
            preview: false,
            cache: false,
            search: `index=airbnb Beds>=${minBeds} Beds<=${maxBeds} | table Name Neighbourhood Beds | head ${count}`
        });
        
        searchManager.data("results", {count: count, status_buckets: 10})
        .on("data", function(state: any, job: any){

            const fields: string[] = job.fields;
            const rows: string[][] = job.rows;
            
            resolve({
                fields,
                rows
            });

        });

    });
};
/**
 * Converts an ITable into a IListing[] array.
 * @param table A table containing rows of events.
 * @returns A formated array.
 */
export const convertTableToListingsArray = (
    table: ITable
): IListing[] => {
    
    return table.rows.map((r, i) => ({
        Index: i,
        Name: r[0],
        Neighbourhood: r[1],
        Beds: parseInt(r[2]),
        Selected: false
    }));

};