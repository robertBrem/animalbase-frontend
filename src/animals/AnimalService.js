export default class AnimalService {
    url = `http://localhost`;

    async getAll() {
        return fetch(`${this.url}:8090/api/animals`, {cache: 'reload'})
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            });
    }

    async post(object) {
        return fetch(`${this.url}:8090/api/animals`, {
            method: 'POST',
            cache: 'reload',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .catch(error => {
                console.log(error)
            });
    }

}