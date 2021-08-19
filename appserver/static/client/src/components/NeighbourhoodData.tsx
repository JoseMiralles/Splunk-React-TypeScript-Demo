import React from "react";
import { IListing } from "../util/searchUtil";

interface IProps {
    listings: IListing[];
}

const NeighbourhoodsData = (
    {listings}: IProps
) => {

    const neighbourhoods: {[indexer: string]: number} = {};
    let totalBeds = 0;

    listings.forEach(l => {
        totalBeds += l.Beds;
        if (!neighbourhoods[l.Neighbourhood]) neighbourhoods[l.Neighbourhood] = 0;
        neighbourhoods[l.Neighbourhood] += l.Beds;
    });

    return (
        <>

        <div>
            <h2>Total Beds {totalBeds}</h2>
        </div>
        
        <table>
            <tr>
                <th>Neighbourhood</th>
                <th>Beds</th>
            </tr>

            { Object.keys(neighbourhoods).map(k => (
                <tr>
                    <td>{ k }</td>
                    <td>{ neighbourhoods[k] }</td>
                </tr>
            ))}

        </table>

        </>
    );
}

export default NeighbourhoodsData;