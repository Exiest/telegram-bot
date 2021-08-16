import Product from './product';
import Courier from './courier';
import IPayStrategy from '../interfaces/IPayStrategy';

class Order {
    bucket!: Array<Product>;
    address: string;
    executor!: Courier;
    payStrategy!: IPayStrategy; 

    constructor(bucket: Array<Product>, address: string) {
        this.bucket = bucket;
        this.address = address;
    }

    setStrategy(strategy: IPayStrategy) {
        this.payStrategy = strategy;
    }

    makeReview() : string {
        let review = "";
        let total = 0;
        let currency = "";
        review += "Your order:\n"
        review.trim()
        this.bucket.forEach((element, index) => {
            review += `${this.bucket.length > 0 ? (index + 1) + ')' : ""}${element.name}, ${element.size.weight}\n`;
            review.trim();
            total += element.size?.price?.value;
            currency = element.size?.price?.currency;
        });
        review += `Total price: ${total}${currency}\n`;
        review.trim();
        review += `${this.executor.deliver()}\n`;
        review.trim();
        review += `on address ${this.address}\n`;
        review.trim();
        review += `${this.payStrategy.handlePayment()}\n`
        return review;
    }
}

export default Order;