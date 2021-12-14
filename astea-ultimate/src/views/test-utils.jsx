import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import rootReducer from "../reducers/rootReducer";

function render(ui, {
    preloadedState,
    store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)), //TODO figure out how to to preloaded state
    ...renderOptions
} = {}) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };