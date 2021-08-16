import { State, OpenedState, ClosedState } from '../utils/state';
import Order from './order';
import Courier from './courier';
import { IObservable } from '../interfaces/IObservable';

let openedState = new OpenedState("Opened");
let closedState = new ClosedState("Closed");

class DeliveryService implements IObservable {
    state!: State;
    couriers: Array<Courier>;

    constructor() {
        this.couriers = new Array<Courier>();
        this.registerCourier(new Courier("Michael", "Mazda RX-7"));
        this.registerCourier(new Courier("Bob", "Mitsubishi Evolution 8"));
        this.registerCourier(new Courier("Henry", "Dodge Viper MH"));
        this.registerCourier(new Courier("Charles", "Mercedes McLoren"));
        this.registerCourier(new Courier("Mike", "BMW M3 GTR"));
    }

    setState() {
        let date = new Date();
        let time = date.getHours();
        this.state = openedState;
        if(time > 23 || time < 9) {
            this.state = closedState;
        }
        else {
            this.state = openedState;
        }
    }

    registerCourier(courier: Courier) : void {
        this.couriers.push(courier);
    }

    removeCourier(courier: Courier) : void {
        for(let i = 0; i < this.couriers.length; i++) {
            if(this.couriers[i] === courier)
            {
                this.couriers.splice(i, 1);
            }
        }
    }

    handleOrder(order: Order) : string {
        this.setState();
        let status = this.state.beginWorking();
        if(status === "Ready") {
            this.setExecutor(order, this.getAvailableCourier());
            return order.makeReview();
        }
        else {
            return "Sorry, service is not available now. Our working hours : 9:00-18:00";
        }
    }

    getAvailableCourier() : Courier {
        let index: number;
        let status : boolean = false;
        do
        {
            index = Math.floor(Math.random() * Math.floor(this.couriers.length - 1));
            status = this.notifyCourier(this.couriers[index]);
            if(status === true) {
                break;
            }
        }
        while(1);
        let courier = this.couriers[index];
        return courier;
    }

    notifyCourier(courier: Courier) : boolean {
        return courier.receiveOrder();
    }
    
    setExecutor(order: Order, courier: Courier) {
        order.executor = courier;
    }
}

let deliveryService = new DeliveryService();

export default deliveryService;
