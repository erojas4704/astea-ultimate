import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import rootReducer from "../reducers/rootReducer";
import { BrowserRouter as Router } from "react-router-dom";

function render(ui, {
    preloadedState,
    store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)), //TODO figure out how to do preloaded state
    ...renderOptions
} = {}) {
    function Wrapper({ children }) {
        if (renderOptions.includeRouter) {
            return (
                <Provider store={store}>
                    <Router>
                        {children}
                    </Router>
                </Provider>
            )
        }
        return (
            <Provider store={store}>{children}</Provider>
        )
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };