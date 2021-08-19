import { combineReducers, createStore } from "redux";
import { ListingsActions, listingsReducer } from "./listingsModel";

export type AppActions = ListingsActions;

const rootReducer = combineReducers({
    listings: listingsReducer
});

export const store = createStore(rootReducer);

export type rootState = ReturnType<typeof store.getState>;
