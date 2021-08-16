import DessertModel from '../schemas/dessertSchema';
import Dessert from '../models/dessert';
import Storage from './storage'
class DessertStorage extends Storage {
    constructor() {
        super();
    }

    async fillArray() {
        let products = await this.getAll();
        Array.from(products).forEach(element => {
            let dessert : Dessert = new Dessert(element.name, element.size? element.size : {}, element.image ? element.image : {});
            this.items.push(dessert);
        });
    }

    getAll() {
        return DessertModel.find();
    }
}

let dessertStorage = new DessertStorage();

export default dessertStorage;