import { IListing } from "../util/searchUtil";
import { AppActions } from "./store";


// State Interface

export interface IListingsState {
    all: IListing[];
    loading: boolean;
}


// Actions

export interface ISetListingsLoading {
    type: "SET_LISTINGS_LOADING",
    loading: boolean
}

export interface IReceiveAllListings {
    type: "RECEIVE_ALL_LISTINGS",
    listings: IListing[]
}

export type ListingsActions =
    IReceiveAllListings |
    ISetListingsLoading;


// Reducer

const initialState: IListingsState = {
    all: [],
    loading: false
}

export const listingsReducer = (
    state: IListingsState = initialState,
    action: AppActions
): IListingsState => {

    switch(action.type) {

        case "RECEIVE_ALL_LISTINGS":
            return {
                all: action.listings,
                loading: false
            }
        break;

        case "SET_LISTINGS_LOADING":
            return {
                ...state,
                loading: action.loading
            }
        break;

        default: return state;

    }

};
