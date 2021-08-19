import React from "react";
import { useDispatch } from "react-redux";
import { IListing } from "../model/listingsModel";
import { AppDispatch } from "../model/store";

interface IProps {
    listings: IListing[]
}

const ListingsGrid = ({ listings }: IProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const onClick = (
        e: React.MouseEvent<HTMLUListElement, MouseEvent>
    ) => {
        //@ts-ignore
        const idx = e.target.getAttribute("index");
        console.log(idx);

        if (idx) {
            dispatch({
                type: "TOGGLE_LISTING_SELECTION",
                Index: idx
            });
        }
    };

    return (
        <ul
            onClick={onClick}
            id="listings-ul">
            {listings.length
                ? mapListings(listings)
                : <li>No Listings found :(</li>}
        </ul>
    );
}

const mapListings = (listings: IListing[]) => {
    return listings.map(l => {

        const cm = l.Selected ? "selected" : "";

        return (
            <>
            {//@ts-ignore
            <li className={cm} index={l.Index}>
                <h3>{l.Name}</h3>
                <div className="row">
                    <p>{l.Neighbourhood}</p>
                    <p> | </p>
                    <p>Beds: {l.Beds}</p>
                </div>
            </li>}
            </>
        );
    })
}

export default ListingsGrid;
