import Product from '../models/product';

interface ICloneable {
    clone() : Product | undefined;
}

export default ICloneable;