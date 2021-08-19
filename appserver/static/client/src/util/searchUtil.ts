export interface ITable {
    fields: string[],
    rows: string[][]
}
/**
 * Gets all of the listings which are minBeds < listing > maxBeds
 */
export const performSearch = (
    minBeds: number,
    maxBeds: number
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
                preview: true,
                cache: false,
                search: `index=airbnb Beds>${minBeds} Beds<${maxBeds} | table Name Neighbourhood Beds`
            });
            const obj = searchManager.data("results");
            searchManager.on("search:done", function(state: any, job: any){
                
                window.splunkjs.mvc.Components
                    .revokeInstance(searchId);
    
                if (state.content.resultCount === 0) {
                    // No results found.
                    resolve({
                        fields: [],
                        rows: []
                    })
                }
                else {
                    job.fetch(function (err: any) {
                        job.results({}, function (err: any, results: any) {
                            const fields: string[] = results.fields;
                            const rows: string[][] = results.rows;
                            
                            resolve({
                                fields,
                                rows
                            });
                        });
                    });
                }
    
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