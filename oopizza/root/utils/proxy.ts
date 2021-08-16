import IOrder from '../interfaces/IOrder';
import Order from '../models/order';
import User from '../models/user';
import Product from '../models/product';

class Proxy implements IOrder {
    user: User;

    constructor(new_user: User) {
        this.user = new_user;
    }

    getId() : number {
        return this.user.getId();
    }

    addItem(item: Product) : string | void {
        if(Number(this.user.items()) < 10) {
            this.user.addItem(item);
        }
        else {
            return "You cannot add items anymore. Bucket's size 10 reached";
        }
    }

    deleteItem(name: string) : boolean {
        if(this.user.items() !== 0) {
            let status = this.user.deleteItem(name);
            return status;
        }
        else {
            return false;
        } 
    }

    getBucket() : Array<Product>{
        return this.user.getBucket()
    }

    makeOrder(address: string) : string | Order {
        if(this.user.items() === 0) {
            return "You cannot order an empty bucket";
        }
        else
        {
            return this.user.makeOrder(address);
        }
    }
}

export default Proxy;



