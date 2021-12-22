import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../api';

//TODO createAsyncThunk instead when you learn it
export const loadOrder = ({ id }) => {
    return async dispatch => {
        dispatch({ type: 'orders/loadOrder/pending', payload: { id } });
        try{
            //Get cached order
            const order = await Api.getServiceOrder(id, true);
            dispatch({ type: 'orders/loadOrder/cached', payload: order });
        }catch(err){}//Cached Orders fail silently. We catch it here to avoid the error being caught by the slice.
        try {
            const order = await Api.getServiceOrder(id);
            dispatch({ type: 'orders/loadOrder/fulfilled', payload: order });
        } catch (err) {
            debugger;
            dispatch({ type: 'orders/loadOrder/rejected', payload: { id, error: err } });
            throw err;
        };
        //return { id, ...order };
    }
};

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
    extraReducers: {
        ['orders/loadOrder/pending']: (state, action) => {
            state[action.payload.id] = state[action.payload.id] || {};
            state[action.payload.id].status = "pending";
        },
        ['orders/loadOrder/fulfilled']: (state, action) => {
            state[action.payload.id].order = action.payload;
            state[action.payload.id].status = "complete";
        },
        ['orders/loadOrder/rejected']: (state, action) => {
            state[action.payload.id] = state[action.payload.id] || {};
            state[action.payload.id].status = "error";
            state[action.payload.id].error = action.payload.error;
        },
        ['orders/loadOrder/cached']: (state, action) => {
            state[action.payload.id] = state[action.payload.id] || {};
            if(state[action.payload.id === "pending"]) //Overwrite the pending status with the cached order
                state[action.payload.id].order = action.payload;
            //Status does not change if it's been fully loaded
        }
    }
    /*
    extraReducers(builder) {
        builder
            .addCase(loadOrder.pending, (state, action) => {
                state[action.payload.id] = state[action.payload.id] || {};
                state[action.payload.id].status = "pending";
            })
            .addCase(loadOrder.fulfilled, (state, action) => {
                state[action.payload.id] = state[action.payload.id] || {};
                state[action.payload.id].status = "complete";
                state[action.payload.id].order = action.payload;
            })
            .addCase(loadOrder.rejected, (state, action) => {
                state[action.payload.id] = state[action.payload.id] || {};
                state[action.payload.id].status = "error";
                state[action.payload.id].error = action.payload.error;
            });
    }
    */
});

//TODO consider nested reducer for simplicty's sake

export const { setOrder } = orderSlice.actions;
export const getOrderById = (state, id) => {
    console.log(state.orders[id]);
    console.log(id);
    return state.orders[id] || {};

}
export default orderSlice.reducer;