export default class Animal {
    constructor(json) {
        if (!json) {
            this.names = []
            this.imagePaths = []
            return
        }
        this.id = json.id;
        this.names = json.names;
        this.imagePaths = json.imagePaths;
        this.chipId = json.chipId;
        this.birthday = json.birthday;
        this.acquired = json.acquired;
    }

    getName() {
        return this.names
            .filter(name => name.language === getLanguage())
            .map(name => name.translation)[0];
    }
}