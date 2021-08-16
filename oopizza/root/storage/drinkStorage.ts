import DrinkModel from '../schemas/drinkSchema';
import Drink from '../models/drink';
import Storage from './storage'
class DrinkStorage extends Storage {
    constructor() {
        super();
    }

    async fillArray() {
        let products = await this.getAll();
        Array.from(products).forEach(element => {
            let drink : Drink = new Drink(element.name, element.size? element.size : {}, element.image ? element.image : {});
            this.items.push(drink);
        });
    }

    getAll() {
        return DrinkModel.find();
    }
}

let drinkStorage = new DrinkStorage();

export default drinkStorage;