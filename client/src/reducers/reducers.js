export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'ADDONECARTITEMCOUNT':
            return {
                ...state,
                cartItemsCount: state.cartItemsCount + 1
            };
        case 'REMOVEONECARTITEMCOUNT':
            return {
                ...state,
                cartItemsCount: state.cartItemsCount - 1
            };
        case 'SETCARTITEMSCOUNT':
            return {
                ...state,
                cartItemsCount: action.count
            };
        case 'ADDCARTITEM':
            return {
                ...state,
                cartItems: action.item
            };
        default:
            return {
                ...state,
                counter: state.counter
            }
    }
}