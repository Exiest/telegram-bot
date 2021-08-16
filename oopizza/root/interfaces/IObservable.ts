import Courier from '../models/courier';
import Order from '../models/order';

export interface IObservable {
    registerCourier(courier: Courier) : void;
    removeCourier(courier: Courier) : void;
    notifyCourier(courier: Courier) : void;
}