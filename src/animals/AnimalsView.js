import {html, render} from 'https://unpkg.com/lit-html?module';
import AnimalService from './AnimalService.js';

export default class AnimalsView extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        new AnimalService().getAll()
            .then(animals => {
                this.animals = animals;
                render(this.getTemplate(), this.root)
            });
    }

    getTemplate() {
        let animalEntries = this.animals
            .map(animal => html`<tr>
            <td>${animal.chipId}</td>
            <td><img src="${animal.imagePaths}" /></td>
            <td>${animal.names[0].translation}</td>
            <td>${animal.birthday}</td>
            <td>${animal.acquired}</td>
        </tr>`);
        console.log(this.animals)
        return html`
            <h1>Animals</h1>
<h2>Reptilien</h2>
<h3>Schildkröten</h3>
<h4>Spaltenschildkröte</h4>
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
