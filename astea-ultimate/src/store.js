import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers/rootReducer";
import thunk from "redux-thunk";

export const persistedReducer = persistReducer({
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}, rootReducer);

export const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export const persistedStore = persistStore(store);
