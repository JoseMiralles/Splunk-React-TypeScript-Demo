import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActions, rootState } from "../model/store";
import { convertTableToListingsArray, performSearch } from "../util/searchUtil";

interface IProps {
    loading: boolean
}

const SearchForm = (
    {loading}: IProps
) => {

    const dispatch = useDispatch<Dispatch<AppActions>>();

    const [maxBeds, setMaxBeds] = useState<number>(6);
    const [minBeds, setMinBeds] = useState<number>(1);
    const [count, setCount] = useState<number>(100);

    const valueChanged = (field: "min" | "max" | "count") => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            let num = parseInt(e.target.value);
            switch(field){
                case "max": setMaxBeds(num); break;
                case "min": setMinBeds(num); break;
                case "count": setCount(num); break;
            }
        }
    }

    const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            dispatch({
                type: "SET_LISTINGS_LOADING",
                loading: true
            });
            const table = await performSearch(minBeds, maxBeds, count);
            dispatch({
                type: "RECEIVE_ALL_LISTINGS",
                listings: convertTableToListingsArray(table)
            });
            dispatch({
                type: "SET_LISTINGS_LOADING",
                loading: false
            });
        })();
    };
    
    return (
        <form id="beds-form" onSubmit={searchSubmit}>
            <span id="beds-fields-row">
                <label> Min Beds
                    <input
                        type="number"
                        onChange={valueChanged("min")}
                        value={minBeds}/>
                </label>
                <label> Max Beds
                    <input
                        type="number"
                        onChange={valueChanged("max")}
                        value={maxBeds}/>
                </label>
                <label> Count (0 to get all the results)
                    <input
                        type="number"
                        onChange={valueChanged("count")}
                        value={count}/>
                </label>
            </span>
            <button
                disabled={ loading ? true : false }>
                {loading ? "Loading ..." : "Search"}
            </button>
        </form>
    );
};

export default SearchForm;
