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
        },
        extraReducers(builder) {
            builder
                .addCase(searchMaterials.pending, (state) => {
                    state.search.materials = {};
                    state.search.status = "pending";
                })
                .addCase("materials/searchMaterials/cached", (state, action) => {
                    if (state.search.status === "pending") {
                        state.search.materials = action.payload;
                    }
                })
                .addCase(searchMaterials.fulfilled, (state, action) => {
                    state.search.status = "complete";
                    state.search.materials = action.payload;
                })
        }
    }
});

export default materialSlice.reducer;