import React, { useState } from "react";
import { useSelector } from "react-redux";
import ListingsGrid from "./components/ListingsGrid";
import SearchForm from "./components/SearchForm";
import Table from "./components/Table";
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

        <div id="main-content-section">
            {(tab === "Grid") && <ListingsGrid listings={listings} />}
            {(tab === "Table") && <Table listings={listings} loading={loading} />}
        </div>

    </div>;

};

export default App;