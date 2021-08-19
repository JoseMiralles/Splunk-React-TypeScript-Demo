import React, { useState } from "react";
import { useSelector } from "react-redux";
import ListingsGrid from "./components/ListingsGrid";
import SearchForm from "./components/SearchForm";
import TabsBar from "./components/TabsBar";
import { rootState } from "./model/store";
import "./styles.scss"
import { convertTableToListingsArray, IListing, performSearch } from "./util/searchUtil";

const App: React.FC = () => {

    const {loading, listings, tab} = useSelector((s: rootState) => {
        return {
            loading: s.listings.loading,
            listings: s.listings.all,
            tab: s.ui.selectedTab
        }
    });

    return <div>

        <SearchForm loading={loading}/>

        <TabsBar selectedTab={tab} />

        {(tab === "Grid") && <ListingsGrid listings={listings} />}
        {(tab === "Graph") && <h1>GRAPH GOES HERE</h1>}

    </div>;

};

export default App;