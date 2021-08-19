import { AppActions } from "./store";


// State Interface

export interface IListing {
    Index: number;
    Name: string;
    Neighbourhood: string;
    Beds: number;
    Selected: boolean;
}

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

export interface IToggleListingSelection {
    type: "TOGGLE_LISTING_SELECTION",
    Index: number
}

export type ListingsActions =
    IReceiveAllListings |
    ISetListingsLoading |
    IToggleListingSelection;


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

        case "TOGGLE_LISTING_SELECTION":
            const newArr = [...state.all];
            newArr[action.Index].Selected = !newArr[action.Index].Selected; 
            return {
                ...state,
                all: newArr
            }
        break;

        default: return state;

    }

};
