export default class {

    // Get all threads
    static async getAllNews() {
        return fetch(`http://localhost:5000/api/news`)
            .then(res => res.json())
            .then(data => data)
            .catch((err) => console.log(err))
    }

    // Delete thread
    static deleteThread(id) {
        return fetch(`http://localhost:5000/api/news/${id}`, {
            method: 'DELETE'
        })
            .catch(err => console.log(err))
    }

    // Create new thread
    static createThread(header, text, image) {
        return fetch('http://localhost:5000/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                header: header,
                text: text,
                image: image
            })
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    }
}