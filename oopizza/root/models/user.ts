import IOrder from '../interfaces/IOrder';
import Product from './product';
import Order from './order';

class User implements IOrder {
    name: string;
    chat_id: number;
    bucket: Array<Product>;

    constructor(name: string, chat_id: number)
    {
        this.name = name;
        this.chat_id = chat_id;
        this.bucket = new Array<Product>();
    }

    makeOrder(address: string): Order | string {
        let order = new Order(this.bucket, address);
        return order;
    }

    getId() : number {
        return this.chat_id;
    }

    addItem(item: Product) : void {
        this.bucket.push(item);
    }

    getBucket() : Array<Product> {
        return this.bucket;
    }

    deleteItem(name: string) : boolean {
        let index = this.bucket.findIndex((el) => {if(el.name === name) return el });
        console.log(index);
        this.bucket.splice(index, 1);
        return true;
    }

    items() : number {
        return this.bucket.length;
    }
}

export default User;