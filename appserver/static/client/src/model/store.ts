import { combineReducers, createStore } from "redux";
import { ListingsActions, listingsReducer } from "./listingsModel";
import { UIActionTypes, UIReducer } from "./UIModel";

export type AppActions =
    ListingsActions |
    UIActionTypes;

const rootReducer = combineReducers({
    listings: listingsReducer,
    ui: UIReducer
});

export const store = createStore(rootReducer);

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
