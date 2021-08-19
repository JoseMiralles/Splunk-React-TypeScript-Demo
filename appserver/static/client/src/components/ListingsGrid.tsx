import React from "react";
import { IListing } from "../util/searchUtil";

interface IProps {
    listings: IListing[]
}

const ListingsGrid = ({ listings }: IProps) => {

    return (
        <div>
            <h1>Listings:</h1>
            <ul id="listings-ul">
                {listings.length
                    ? mapListings(listings)
                    : <li>No Listings found :(</li>}
            </ul>
        </div>
    );
}

const mapListings = (listings: IListing[]) => {
    return listings.map(l => {
        return <li>
            <h3>{l.Name}</h3>
            <div className="row">
                <p>{l.Neighbourhood}</p>
                <p> | </p>
                <p>Beds: {l.Beds}</p>
            </div>
        </li>;
    })
}

export default ListingsGrid;
