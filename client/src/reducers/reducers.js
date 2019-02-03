export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'SETCARTITEMSCOUNT':
            return {
                ...state,
                cartItemsCount: action.count
            };
        case 'LOGIN':
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        case 'SETCARTITEMS':
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