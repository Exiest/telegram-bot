import ICloneable from '../interfaces/IClonable';

abstract class Product implements ICloneable {
    name: string;
    size: any;
    image: any;

    constructor(name: string, size: Object, image: Object)
    {
        this.name = name;
        this.size = size;
        this.image = image;
    }

    clone() : Product | undefined {
        let pr = Object.assign({}, this);
        return pr;
    }
}

export default Product;