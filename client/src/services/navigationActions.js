export default class {
    // Get navigation Items
    static getNavItems() {
        return fetch(`http://localhost:5000/api/navItem`)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => console.log(err))
    }
    // Add navigation Item
    static addNavItem(itemName) {
        return fetch(`http://localhost:5000/api/navItem`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: itemName,
            })
        })
            .then(res => res.json())
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    // Delete navigation Item
    static removeNavItem(id) {
        return fetch(`http://localhost:5000/api/navItem/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(response => console.log(response))
    }
}