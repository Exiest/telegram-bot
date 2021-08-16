import Product from './product';

class Pizza extends Product{
    constructor(name: string, size: Object, image: Object)
    {
        super(name, size, image);
    }
}

export default Pizza;