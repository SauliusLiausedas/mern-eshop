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
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true
            };
        default:
            return {
                ...state,
                counter: state.counter
            }
    }
}