import Product from './product';
class Dessert extends Product {
    constructor(name: string, size: Object, image: Object)
    {
        super(name, size, image);
    }
}

export default Dessert;