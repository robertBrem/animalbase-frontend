import {html, render} from 'https://unpkg.com/lit-html?module';
import AnimalService from './AnimalService.js';

export default class AnimalsView extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.service = new AnimalService()
        this.service.getAll()
            .then(animals => {
                this.animals = animals;
                render(this.getTemplate(), this.root)
            });
    }

    handleAddAnimal() {
        this.service
            .post({
                "names": [
                    {"language": "de", "translation": "Spaltenschildkröte"},
                    {"language": "en", "translation": "Pancake Tortoise"}],
                "imagePaths": [
                    {"path": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Malacochersus_tornieri_-_Buffalo_Zoo.jpg/220px-Malacochersus_tornieri_-_Buffalo_Zoo.jpg"}
                ],
                "chipId": "alsdkjfl;asdf",
                "birthday": "2023-05-01",
                "acquired": "2023-05-01"
            })
            .then(render(this.getTemplate(), this.root))
    }

    getTemplate() {
        let animalEntries = this.animals
            .map(animal => html`
                <tr>
                    <td>${animal.chipId}</td>
                    <td><img src="${animal.imagePaths[0].path}"/></td>
                    <td>${animal.names[0].translation}</td>
                    <td>${animal.birthday}</td>
                    <td>${animal.acquired}</td>
                </tr>`);
        console.log(this.animals)
        return html`
            <h1>Animals</h1>
            <h2>Reptilien</h2>
            <h3>Schildkröten</h3>
            <h4 @click="${_ => this.handleAddAnimal()}">Spaltenschildkröte</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Chip ID</th>
                        <th>BILD</th>
                        <th>Name</th>
                        <th>Alter</th>
                        <th>Hier seit</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${animalEntries}
                    </tbody>
                </table>
        `
    }

}

customElements.define('animals-view', AnimalsView)
