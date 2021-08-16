import Product from "../models/product";

interface IOrder {
    getId() : number;
    addItem(item: Product) : void;
    deleteItem(name: string) : boolean;
    getBucket() : Array<Product>;
    makeOrder(address: string): void;
}

export default IOrder;