import React, { useState } from "react";
import "./styles.scss"
import { convertTableToListingsArray, IListing, performSearch } from "./util/searchUtil";

const App: React.FC = () => {

    const [maxBeds, setMaxBeds] = useState<number>(6);
    const [minBeds, setMinBeds] = useState<number>(1);
    const [listings, setListings] = useState<IListing[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const bedNumberChanged = (field: "min" | "max") => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            let num = parseInt(e.target.value);
            if (num > 6) num = 6;
            if (num < 0) num = 0;
            switch(field){
                case "max": setMaxBeds(num); break;
                case "min": setMinBeds(num); break;
            }
        }
    }

    const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            setLoading(true);
            const table = await performSearch(minBeds, maxBeds);
            setListings(convertTableToListingsArray(table));
            setLoading(false);
        })();
    };

    return <div>

        <form id="beds-form" onSubmit={searchSubmit}>
            <span id="beds-fields-row">
                <label> Min Beds
                    <input
                        type="number"
                        onChange={bedNumberChanged("min")}
                        value={minBeds}/>
                </label>
                <label> Max Beds
                    <input
                        type="number"
                        onChange={bedNumberChanged("max")}
                        value={maxBeds}/>
                </label>
            </span>
            <button
                disabled={ loading ? true : false }>
                {loading ? "Loading ..." : "Search"}
            </button>
        </form>

        <div>
            <h1>Listings:</h1>
            <ul id="listings-ul">
                {listings.length
                ? listings.map(l => {
                    return <li>
                        <h3>{l.Name}</h3>
                        <p>{l.Neighbourhood}</p>
                        <p>Beds: {l.Beds}</p>
                    </li>;
                })
                : <li>No Listings found :(</li> }
            </ul>
        </div>

    </div>;

};

export default App;