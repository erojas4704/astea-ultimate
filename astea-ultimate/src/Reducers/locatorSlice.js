import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../api";

const INITIAL_STATE = {
    criteria: "",
    status: "idle",
    error: null,
    summaries: {},
    results: []
}

//TODO make a createAsyncThunk function that does both the cached and the non-cached versions to avoid duplication of code.
export const search = createAsyncThunk(
    "locator/search",
    async (query, thunkAPI) => {
        // Api.search(query, true)
        //     .then(results => {
        //         if (!results) return []; //Need proper error handling for our API.
        //         thunkAPI.dispatch({ type: "locator/search/cached", payload: results });
        //     });
        const resp = await Api.search(query);
        if (resp.error) throw resp.error;
        return resp.results;
    }
)

function mergeResults(arr1, arr2) {
    const reduceById = (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }
    const map = {
        ...arr1.reduce(reduceById, {}),
        ...arr2.reduce(reduceById, {})
    }

    return Object.values(map);
}

export const locatorSlice = createSlice({
    name: 'locator',
    initialState: INITIAL_STATE,
    reducers: {
        resetSearch: (state) => {
            state.status = "idle";
        }
    },
    extraReducers(builder) {
        builder
            .addCase(search.pending, (state, action) => {
                console.log(action);
                state.status = "pending";
                state.results = [];
            })
            .addCase('locator/search/cached', (state, action) => {
                //If status is pending, we will set our results to our cached results.
                //We will also overwrite any summaries that don't exist, but we won't overwrite any that do.
                const merged = mergeResults(state.results, action.payload)
                    .sort((a, b) => a.openDate - b.openDate);

                state.results = merged;
                //TODO consider the implications of using locally stored data as well as Astea data.
                if (state.status === "pending") {
                    state.summaries = action.payload.reduce((acc, result) => {
                        acc[result.id] = result;
                        return acc;
                    }, state.summaries);
                }
            })
            .addCase(search.fulfilled, (state, action) => {
                state.status = "complete";
                state.results = mergeResults(state.results, action.payload);
                //Sort by orderID
                state.results = state.results.sort((a, b) => a.openDate - b.openDate);

                //Add the results to the summaries by ID
                state.summaries = action.payload.reduce((acc, result) => {
                    acc[result.id] = result;
                    return acc;
                }, state.summaries);
            })
            .addCase(search.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
    }
});

export const { resetSearch } = locatorSlice.actions;
export default locatorSlice.reducer;