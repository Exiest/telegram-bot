import Storage from '../storage/storage';
import Product from "../models/product";
import pizzaStorage from '../storage/pizzaStorage';
import dessertStorage from '../storage/dessertStorage';
import drinkStorage from '../storage/drinkStorage';

abstract class Identifier {
    successor! : Identifier;
    storage! : Storage;

    setSuccessor(successor : Identifier) {
        this.successor = successor;
    }

    abstract identify(name: string) : Product | undefined;
}

class PizzaIdentifier extends Identifier {
    constructor() {
        super();
        this.storage = pizzaStorage;
    }

    identify(name: string) : Product | undefined {
        let product = this.storage.getByName(name);
        if(product) {
            return product;
        }
        else {
            if(this.successor) {
                return this.successor.identify(name);
            }
            else {
                return undefined;
            }
        }
    }
}

class DrinkIdentifier extends Identifier {
    constructor() {
        super();
        this.storage = drinkStorage;
    }

    identify(name: string) : Product | undefined {
        let product = this.storage.getByName(name);
        if(product) {
            return product;
        }
        else {
            if(this.successor) {
                return this.successor.identify(name);
            }
            else {
                return undefined;
            }
        }
    }
}

class DessertIdentifier extends Identifier {
    constructor() {
        super();
        this.storage = dessertStorage;
    }

    identify(name: string) : Product | undefined {
        let product = this.storage.getByName(name);
        if(product) {
            return product;
        }
        else {
            if(this.successor) {
                return this.successor.identify(name);
            }
            else {
                return undefined;
            }
        }
    }
}

let ProductIdentifier : Identifier = new PizzaIdentifier();
let ProductIdentifier1 : Identifier = new DrinkIdentifier();
let ProductIdentifier2 : Identifier = new DessertIdentifier();
ProductIdentifier.setSuccessor(ProductIdentifier1);
ProductIdentifier1.setSuccessor(ProductIdentifier2);

export default ProductIdentifier;