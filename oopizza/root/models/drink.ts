import Product from './product';
class Drink extends Product {
    constructor(name: string, size: Object, image: Object)
    {
        super(name, size, image);
    }
}

export default Drink;