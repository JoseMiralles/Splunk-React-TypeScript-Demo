import React from "react";
import { IListing } from "../model/listingsModel";

interface IProps {
    listings: IListing[];
}

interface INeighbourhoodsData {
    beds: number,
    listings: number
} 

const NeighbourhoodsData = (
    {listings}: IProps
) => {

    const neighbourhoods: {[indexer: string]: INeighbourhoodsData} = {};
    let totalBeds = 0;
    let totalListings = 0;

    listings.forEach(l => {

        totalBeds += l.Beds;
        totalListings++;

        if (!neighbourhoods[l.Neighbourhood]) neighbourhoods[l.Neighbourhood] = {
            beds: 0, listings: 0
        };

        neighbourhoods[l.Neighbourhood].beds += l.Beds;
        neighbourhoods[l.Neighbourhood].listings += 1;
    });

    return (
        <>

        <div>
            <h2>Total Beds {totalBeds}</h2>
            <h2>Total Listings {totalListings}</h2>
        </div>
        
        <table>
            <tr>
                <th>Neighbourhood</th>
                <th>Beds</th>
                <th>Listings</th>
            </tr>

            { Object.keys(neighbourhoods).map(k => (
                <tr>
                    <td>{ k }</td>
                    <td>{ neighbourhoods[k].beds }</td>
                    <td>{ neighbourhoods[k].listings }</td>
                </tr>
            ))}

        </table>

        </>
    );
}

export default NeighbourhoodsData;