import React from "react";
import { IListing } from "../model/listingsModel";

interface IProps {
    listings: IListing[],
    loading: boolean
}

const Table = (
    { listings, loading }: IProps
) => {

    return (

        <table id="listings-table">

            {/* Table headers */}
            <tr>
                <th></th>
                <th>Name</th>
                <th>Beds</th>
                <th>Neighbourhood</th>
            </tr>

            {/* Table rows */}
            { listings.map((t, i) =>
                <tr>
                    <td>{i + 1}</td>
                    <td>{t.Name}</td>
                    <td>{t.Beds}</td>
                    <td>{t.Neighbourhood}</td>
                </tr>
            )}

        </table>
        
    );
};

export default Table;
