import { AppActions } from "./store";

export type tabTypes = "Grid" | "Graph";
export const tabTypesArray: tabTypes[] = [ "Grid", "Graph" ];

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
    selectedTab: "Grid"
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
