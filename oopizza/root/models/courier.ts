import { IObserver } from "../interfaces/IObserver";
import IDeliver from '../interfaces/IDeliver';

class Courier implements IObserver, IDeliver {
    name: string;
    car: string;

    constructor(name: string, car: string) {
        this.name = name;
        this.car = car;
    }

    receiveOrder() : boolean {
        let index = Math.round(Math.random() * 10)
        if(index % 2 === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    deliver() : string {
        return `Order will be delivered by ${this.name} on car ${this.car}`;
    }
}

export default Courier;