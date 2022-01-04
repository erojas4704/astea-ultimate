import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../api";


export const searchMaterials = createAsyncThunk(
    "materials/searchMaterials",
    async (query, thunkAPI) => {
        Api.searchMaterials(query, true)
            .then(materials => {
                thunkAPI.dispatch({ type: "materials/searchMaterials/cached", payload: materials });
            });
        return await Api.searchMaterials(query);
    }
)

export const materialSlice = createSlice({
    name: 'materials',
    initialState: {
        search: {
            materials: {},
            status: "idle"
        },
        materials: {}
    },
    reducers: {
        setMaterial: (state, action) => {
            const material = action.payload.material;
            state[material.id] = {
                data: material
            };
        }
    },
    extraReducers(builder) {
        builder
            .addCase(searchMaterials.pending, (state) => {
                state.search.status = "pending";
            })
            .addCase(searchMaterials.fulfilled, (state, action) => {
                state.search.status = "complete";
                if(!action.payload) action.payload = []; //TODO this is a hack. because error handling does not work.
                state.search.materials = action.payload.reduce((acc, material) => {
                    acc[material.id] = material;
                    return acc;
                }, state.search.materials);
            })
            .addCase(searchMaterials.rejected, (state, action) => {
                state.search.status = "error";
                state.search.error = action.payload;
            })
            .addCase("materials/searchMaterials/cached", (state, action) => {
                if (state.search.status === "pending") {
                    state.search.materials = action.payload.reduce((acc, material) => {
                        acc[material.id] = material;
                        return acc;
                    }, state.search.materials);
                }
            })
    }
});

export default materialSlice.reducer;