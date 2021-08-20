import { AppActions } from "./store";

export type tabTypes = "Grid" | "Table" | "Neighbourhoods" | "Charts";
export const tabTypesArray: tabTypes[]= [
    "Table", "Charts", "Grid", "Neighbourhoods"
];

export interface UIState {
    selectedTab: tabTypes
}


// Actions
export interface ISelectTab {
    type: "SELECT_TAB",
    tab: tabTypes
}

export type UIActionTypes = ISelectTab;


// Reducer
const initialState: UIState = {
    selectedTab: "Table"
}

export const UIReducer = (
    state: UIState = initialState,
    action: AppActions
): UIState => {

    switch(action.type) {

        case "SELECT_TAB":
            return {
                ... state,
                selectedTab: action.tab
            }
            break;
        
        default: return state;

    }

};
