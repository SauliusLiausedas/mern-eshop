export default class {
    // Get navigation ItemsTable
    static getItems() {
        return fetch(`http://localhost:5000/api/items`)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => console.log(err))
    }

    static addItem(item, token) {
        return fetch(`http://localhost:5000/api/items`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: item,
                token: token
            })
        })
    }

    static deleteItem(id, token) {
        return fetch(`http://localhost:5000/api/items/${id}/${token}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(response => console.log(response))
    }

    static pickPromotedItems(quantity) {
        return fetch(`http://localhost:5000/api/items/promoted/${quantity}`)
            .then(res => res.json())
            .then(data => data)
            .catch((err) => err)
    }

    static increaseClickPoint(id) {
        return fetch(`http://localhost:5000/api/items/clickpoints/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .catch(err => err)
    }
}