export default class AnimalService {
    async getAll() {
        return fetch(`http://localhost:8090/api/animals`, {cache: 'reload'})
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            });
    }

}