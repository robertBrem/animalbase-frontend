import {html, render} from 'https://unpkg.com/lit-html?module';
import AnimalService from './AnimalService.js';
import Animal from './Animal.js';

export default class AnimalsView extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.service = new AnimalService()
        this.currentAnimal = new Animal()
        this.reload()
    }

    reload() {
        this.service.getAll()
            .then(animals => {
                this.animals = animals.map(animal => new Animal(animal));
                render(this.getTemplate(), this.root)

                const uploadInput = this.root.getElementById("uploadInput");
                uploadInput.addEventListener(
                    "change",
                    () => {
                        // Calculate total size
                        let numberOfBytes = 0;
                        for (const file of uploadInput.files) {
                            numberOfBytes += file.size;
                        }

                        // Approximate to the closest prefixed unit
                        const units = [
                            "B",
                            "KiB",
                            "MiB",
                            "GiB",
                            "TiB",
                            "PiB",
                            "EiB",
                            "ZiB",
                            "YiB",
                        ];
                        const exponent = Math.min(
                            Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
                            units.length - 1,
                        );
                        const approx = numberOfBytes / 1024 ** exponent;
                        const output =
                            exponent === 0
                                ? `${numberOfBytes} bytes`
                                : `${approx.toFixed(3)} ${
                                    units[exponent]
                                } (${numberOfBytes} bytes)`;

                        // this.root.getElementById("fileNum").textContent = uploadInput.files.length;
                        // this.root.getElementById("fileSize").textContent = output;
                    },
                    false,
                );
            });
    }

    handleAddAnimal() {
        this.service
            .post(this.currentAnimal)
            .then(_ => this.reload())
    }

    handleAddAnimal2() {
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
            .then(_ => this.reload())
    }

    submitForm = (e) => {
        e.preventDefault();

        const form = this.root.querySelector("form");
        let formData = new FormData(form);
        return fetch("http://localhost:8090/upload", {
            "body": formData,
            "method": "POST"
        })
            .then(res => {
                let url = res.headers.get('Location')
                this.root.getElementById("imageUrl").value = url
                this.currentAnimal.imagePaths.push({"path": url})
            })
    }

    getTemplate() {
        let animalEntries = this.animals
            .map(animal => html`
                <tr>
                    <td>${animal.chipId}</td>
                    <td><img src="${(animal.imagePaths[0]) ? animal.imagePaths[0].path : ''}"/></td>
                    <td>${animal.getName()}</td>
                    <td>${animal.birthday}</td>
                    <td>${animal.acquired}</td>
                </tr>`);
        return html`
            <h1>Animals</h1>
            <h2>Reptilien</h2>
            <h3>Schildkröten</h3>
            <form id="uploadForm" enctype="multipart/form-data" method="post" action="http://localhost:8090/upload" @submit=${this.submitForm}>
                <input type="file" name="submitted" id="uploadInput">
                <br/>
                <input type="submit" value="upload">
            </form>
            <br/>
            Chip ID: <input type="text" @change=${e => this.currentAnimal.chipId = (e.target.value)}/><br/>
            Image: <input id="imageUrl" type="text" @change=${e => this.currentAnimal.imagePaths.push({"path": e.target.value})}/>
            <br/>
            Name: <input type="text" @change=${e => this.currentAnimal.names.push({
                "translation": e.target.value,
                "language": getLanguage()
            })}/><br/>
            Geburtstag: <input type="date" @change=${e => this.currentAnimal.birthday = (e.target.value)}/><br/>
            Hier seit: <input type="date" @change=${e => this.currentAnimal.acquired = (e.target.value)}/><br/>
            <h4 @click="${_ => this.handleAddAnimal()}">Spaltenschildkröte</h4>
            <table>
                <thead>
                <tr>
                    <th>Chip ID</th>
                    <th>BILD</th>
                    <th>Name</th>
                    <th>Geburtstag</th>
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
