import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../api';

//TODO createAsyncThunk instead when you learn it
export const loadOrder = ({ id }) => {
    return async dispatch => {
        dispatch({ type: 'orders/loadOrder/pending', payload: { id } });
        try {
            //Get cached order
            const order = await Api.getServiceOrder(id, true);
            dispatch({ type: 'orders/loadOrder/cached', payload: order });
        } catch (err) { }//Cached Orders fail silently. We catch it here to avoid the error being caught by the slice.
        try {
            const order = await Api.getServiceOrder(id);
            dispatch({ type: 'orders/loadOrder/fulfilled', payload: order });
        } catch (err) {
            dispatch({ type: 'orders/loadOrder/rejected', payload: { id, error: err } });
            throw err;
        };
        //return { id, ...order };
    }
};

export const retrieveInteractions = createAsyncThunk(
    'orders/retrieveInteractions',
    async ({ id }, thunkAPI) => {
        Api.getInteractions(id, true)
            .then(interactions => {
                thunkAPI.dispatch({ type: 'orders/retrieveInteractions/cached', payload: interactions });
            });
        return await Api.getInteractions(id);
    }
)

export const addInteraction = createAsyncThunk(
    'orders/addInteraction',
    async ({ id, message }) => await Api.createInteraction(id, message)
);

export const assignTechnician = createAsyncThunk(
    'orders/assignTechnician',
    async ({ id, technicianId }) => await Api.assignTechnician(id, technicianId)
);

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {},
    reducers: {
        setOrder: (state, action) => {
            const order = action.payload.order;
            state.orders[order.id] = {
                data: order
            };
        }
    },
    extraReducers(builder) {
        builder
            .addCase(assignTechnician.pending, (state, action) => {
                const id = action.meta.arg.id;
                state[id].order.technician.id = action.meta.arg.technicianId;
                state[id].order.technician.status = "pending";
            })
            .addCase(assignTechnician.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                state[id].order = action.payload; //Full reset of order
                state[id].order.technician.status = "complete";
            })
            .addCase(assignTechnician.rejected, (state, action) => {
                const id = action.meta.arg.id;
                state[id].order.technician.error = action.payload;
                state[id].order.technician.status = "error";
            })
            .addCase(retrieveInteractions.pending, (state, action) => {
                const id = action.meta.arg.id;
                if (!state[id]) state[id] = {}; //TODO find a way to avoid having this everywhere
                state[id].interactions = {
                    interactions: [],
                    status: "pending"
                }
            })
            .addCase(retrieveInteractions.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                if (!state[id]) state[id] = {}; //TODO find a way to avoid having this everywhere
                state[id].interactions = {
                    ...state[id].interactions,
                    interactions: action.payload || [],
                    status: "complete"
                }
            })
            .addCase(retrieveInteractions.rejected, (state, action) => {
                const id = action.meta.arg.id;
                state[id] = {
                    ...state[id],
                    interactions: {
                        ...state[id].interactions,
                        status: "error",
                        error: action.payload
                    }
                }
            })
            .addCase(addInteraction.pending, (state, action) => {
                const id = action.meta.arg.id;
                state[id] = {
                    ...state[id],
                    interactions: {
                        ...state[id].interactions,
                        status: "pending"
                    }
                }
            })
            .addCase(`orders/retrieveInteractions/cached`, (state, action) => {
                const id = action.meta.arg.id;
                state[id] = {
                    ...state[id],
                    interactions: {
                        interactions: action.payload,
                        ...state[id].interactions,
                    }
                }
            })
            .addCase('orders/loadOrder/fulfilled', (state, action) => {
                state[action.payload.id].order = action.payload;
                state[action.payload.id].status = "complete";
            })
            .addCase('orders/loadOrder/rejected', (state, action) => {
                state[action.payload.id].status = "error";
                state[action.payload.id].error = action.payload.error;
            })
            .addCase('orders/loadOrder/cached', (state, action) => {
                if (state[action.payload.id === "pending"]) //Overwrite the pending status with the cached order
                    state[action.payload.id].order = action.payload;
                //Status does not change if it's been fully loaded
            })
            .addCase('orders/loadOrder/pending', (state, action) => {
                state[action.payload.id] = state[action.payload.id] || {};
                state[action.payload.id].status = "pending";
            })
    }
});

//TODO consider nested reducer for simplicty's sake

export const { setOrder } = orderSlice.actions;
/** Gets an order by ID reference. Returns a blank object if no order is found */
export const getOrderById = (state, id) => state.orders[id] || {};
export default orderSlice.reducer;