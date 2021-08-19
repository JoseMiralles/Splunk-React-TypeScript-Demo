export interface ITable {
    fields: string[],
    rows: string[][]
}
/**
 * Gets all of the listings which are minBeds < listing > maxBeds
 */
export const performSearch = (
    minBeds: number,
    maxBeds: number,
    count: number
): Promise<ITable> => {
    return new Promise((resolve, reject) => {
        const searchId = "listings-search";
        // TODO: handle rejection.
        window.requirejs([
            "splunkjs/mvc/searchmanager",
            "splunkjs/mvc/simplexml/ready!"
        ], function(Searchmanager: any){
            const searchManager = new Searchmanager({
                id: searchId,
                earliest_time: "-5h@y",
                latest_time: "now",
                preview: false,
                cache: false,
                search: `index=airbnb Beds>=${minBeds} Beds<=${maxBeds} | table Name Neighbourhood Beds`
            });
            
            searchManager.data("results", {count: count, status_buckets: 10})
            .on("data", function(state: any, job: any){

                console.log(state);
                console.log(job);
                
                window.splunkjs.mvc.Components
                    .revokeInstance(searchId);
    
                const fields: string[] = job.fields;
                const rows: string[][] = job.rows;
                
                resolve({
                    fields,
                    rows
                });
    
            });
        });

    });
};

export interface IListing {
    Name: string;
    Neighbourhood: string;
    Beds: number;
}
/**
 * Converts an ITable into a IListing[] array.
 * @param table A table containing rows of events.
 * @returns A formated array.
 */
export const convertTableToListingsArray = (
    table: ITable
): IListing[] => {
    
    return table.rows.map(r => ({
        Name: r[0],
        Neighbourhood: r[1],
        Beds: parseInt(r[2])
    }));

};