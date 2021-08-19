import React from "react";
import { IListing } from "../util/searchUtil";

interface IProps {
    listings: IListing[],
    loading: boolean
}

const Table = (
    { listings, loading }: IProps
) => {

    return (
        <>
        <h1>Table</h1>

        <table id="listings-table">

            {/* Table headers */}
            <tr>
                <th>Name</th>
                <th>Beds</th>
                <th>Neighbourhood</th>
            </tr>

            {/* Table rows */}
            { listings.map(t =>
                <tr>
                    <td>{t.Name}</td>
                    <td>{t.Beds}</td>
                    <td>{t.Neighbourhood}</td>
                </tr>
            )}

        </table>
        </>
    );
};

export default Table;
