import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
    data: [],
    cart: [],
    add_to_cart: 0,
    add_to_cart_product_amount: 0,
    bill_date: "1 January 2000",
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        BillDate: (state, action) => {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date = new Date();
            state.bill_date = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
        },
        getDataAPI: (state, action) => {
            state.data = action.payload
        },
        AddDataInCart: (state, action) => {
            state.cart = action.payload;
        },
        UpdateDataInCart: (state, action) => {

            // Update Data :-
            var updateItem = (action.payload.opration == "ADD") ? state.cart.concat([{ "id": action.payload.id, "quantity": 1, "price": (state.data[action.payload.id - 1].price) }]) : (action.payload.opration == "REMOVE") ? state.cart : state.cart;

            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == action.payload.id) {
                    updateItem = state.cart.concat([{ "id": action.payload.id, "quantity": (action.payload.opration == "ADD") ? state.cart[i].quantity + 1 : (action.payload.opration == "REMOVE") ? state.cart[i].quantity - 1 : (action.payload.opration == "DELETE") ? 0 : state.cart[i].quantity, "price": (action.payload.opration == "ADD" ? (state.data[action.payload.id - 1].price) * (state.cart[i].quantity + 1) : (action.payload.opration == "REMOVE") ? (state.data[action.payload.id - 1].price) * (state.cart[i].quantity - 1) : (action.payload.opration == "DELETE") ? 0 : (state.data[action.payload.id - 1].price) * (state.cart[i].quantity)) }]);
                    updateItem.splice(i, 1);
                    break;
                }
                else {
                    updateItem = (action.payload.opration == "ADD" ? state.cart.concat([{ id: action.payload.id, quantity: 1, "price": (state.data[action.payload.id - 1].price) }]) : (action.payload.opration == "REMOVE" ? state.cart : state.cart));
                }
            }
            updateItem = updateItem.sort((a, b) => { return parseInt(a.id) - parseInt(b.id) })
            state.cart = updateItem;

            // Update Cart :-
            state.add_to_cart = 0;
            state.add_to_cart_product_amount = 0;
            for (let i = 0; i < state.cart.length; i++) {
                state.add_to_cart += state.cart[i].quantity;
                state.add_to_cart_product_amount += state.cart[i].price;
            }

        },
        ClearDataInCart: (state, action) => {
            state.add_to_cart = 0;
            state.add_to_cart_product_amount = 0;
        }
    },
})

// Action creators are generated for each case reducer function
export const { getDataAPI, AddDataInCart, UpdateDataInCart, ClearDataInCart, BillDate } = counterSlice.actions

export default counterSlice.reducer