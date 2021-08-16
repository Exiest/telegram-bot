import PizzaModel from '../schemas/pizzaSchema';
import Pizza from '../models/pizza';
import Storage from './storage'

class PizzaStorage extends Storage {
    constructor() {
        super();
    }

    async fillArray() {
        let products = await this.getAll();
        Array.from(products).forEach(element => {
            let pizza : Pizza = new Pizza(element.name, element.size? element.size : {}, element.image ? element.image : {});
            this.items.push(pizza);
        });
    }

    getAll() {
        return PizzaModel.find();
    }
}

let pizzaStorage = new PizzaStorage();

export default pizzaStorage;