import IPayStrategy from '../interfaces/IPayStrategy';

class CashPayStrategy implements IPayStrategy {
    handlePayment() : string {
        return "You have chosen cash payment, please be ready to pay by cash. Payment without the rest will be pleasant.";
    }
}

class CardPayStrategy implements IPayStrategy {
    handlePayment() : string {
        return "You have chosen card payment, please make a transaction when courier comes.";
    }
}

let cashPayStrategy = new CashPayStrategy();
let cardPayStrategy = new CardPayStrategy();

export { cashPayStrategy, cardPayStrategy };