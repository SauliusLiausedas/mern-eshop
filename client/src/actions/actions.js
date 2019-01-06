export default {
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
    login: (nodeId) => {
        return {
            type: 'LOGIN',
            nodeId
        }
    }
}