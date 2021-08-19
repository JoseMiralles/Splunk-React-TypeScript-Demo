import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchForm from "./components/SearchForm";
import { rootState } from "./model/store";
import "./styles.scss"
import { convertTableToListingsArray, IListing, performSearch } from "./util/searchUtil";

const App: React.FC = () => {

    const {loading, listings} = useSelector((s: rootState) => {
        return {
            loading: s.listings.loading,
            listings: s.listings.all
        }
    });

    return <div>

        <SearchForm loading={loading}/>

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