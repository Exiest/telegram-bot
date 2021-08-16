import Product from '../models/product';

abstract class Storage {
    items: Array<Product>;

    constructor() {
        this.items = new Array<Product>();
        this.fillArray();
    }

    abstract async fillArray(): Promise<void>;

    getItems() : Array<Product> { return this.items }

    getByName(name: string) : Product | undefined {
        let product = this.items.find((el) => {
            if(el.name === name) {
                return el;
            }
        })
        return product? product?.clone() : undefined;
    }

    abstract getAll() : void;
}

export default Storage;