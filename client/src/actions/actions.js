// import itemActions from "../services/itemActions";

export const actions = {
    increment: (nodeId) => {
        return {
            type: 'INCREMENT',
            nodeId
        }
    },
    decrement: (nodeId) => {
        return {
            type: 'DECREMENT',
            nodeId
        }
    },
    setCartItems: (item) => {
        return {
            type: 'SETCARTITEMS',
            item: item
        }
    },
    removeCartItem: (nodeId) => {
        return {
            type: 'REMOVECARTITEM',
            nodeId
        }
    },
    login: (boolean) => {
        return {
            type: 'LOGIN',
            loggedIn: boolean
        }
    },
    setCartItemsCount: (items) => {
        return {
            type: 'SETCARTITEMSCOUNT',
            count: items
        }
    }
    // testFetchAsync: (data) => {
    //     return {
    //         type: 'TEST_ASYNC',
    //         data: data
    //     }
    // }
};

// export const testFetch = (dispatch, id) => {
//     itemActions.getItemById(id).then((data)=>{
//         dispatch({
//             type: 'TEST_ASYNC',
//             data: data
//         })
//     })
// };