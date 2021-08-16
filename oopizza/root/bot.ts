import telegram from 'node-telegram-bot-api';
import http from "http";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user';
import pizzaStorage from './storage/pizzaStorage';
import drinkStorage from './storage/drinkStorage';
import dessertStorage from './storage/dessertStorage';
import deliveryService from './models/deliveryService';
import Proxy from './utils/proxy';
import ProductIdentifier from './utils/identifier';
import { cashPayStrategy, cardPayStrategy } from './utils/strategy';

let proxy : Proxy;

dotenv.config()
let bot = new telegram(process.env.TG_TOKEN ? process.env.TG_TOKEN : "", { polling: true });

const connectOptions = { useNewUrlParser: true, ignoreUndefined: true, useFindAndModify: false, useUnifiedTopology: true };

http.createServer().listen(process.env.PORT);
mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : "", connectOptions, () => { console.log("Connected to DB"); })
.catch(err => console.log(err.toString()));

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.onText(/\/start/, async function (msg) {
    let fromId = msg?.from?.id;
    let fromUsername = msg?.from?.username;

    let new_user = new User(fromUsername? fromUsername : "", fromId? fromId : 0);
    proxy = new Proxy(new_user);
    bot.sendMessage(fromId? fromId : "", `Welcome to the OOPizza ${fromUsername}`);
})

bot.onText(/\/desserts/, function (msg) {
    let desserts = dessertStorage.getItems();
    let answer = "";
    Array.from(desserts).forEach((element) => {
        answer += `${element.name}\n`;
        answer.trim();
        answer += `Sizes:\n`;
        answer.trim();
        answer += `Default: ${element.size?.default?.price?.value} ${element.size?.default?.price?.currency}, ${element.size.default?.weight}\n`;
        answer.trim();
        answer += `Medium: ${element.size?.medium?.price?.value} ${element.size?.medium?.price?.currency}, ${element.size.medium?.weight}\n`;
        answer.trim();
        answer += `Large: ${element.size?.large?.price?.value} ${element.size?.large?.price?.currency}, ${element.size.large?.weight}\n`;
        answer.trim();
        answer += element.image?.url ? element.image.url : "";
        bot.sendMessage(proxy.getId(), answer);
        answer = "";
    });
});

bot.onText(/\/pizzas/, function (msg) {
    let pizzas = pizzaStorage.getItems();
    let answer = "";
    Array.from(pizzas).forEach((element) => {
        answer += `${element.name}\n`;
        answer.trim();
        answer += `Sizes:\n`;
        answer.trim();
        answer += `Default: ${element.size?.default?.price?.value} ${element.size?.default?.price?.currency}, ${element.size.default?.weight}\n`;
        answer.trim();
        answer += `Medium: ${element.size?.medium?.price?.value} ${element.size?.medium?.price?.currency}, ${element.size.medium?.weight}\n`;
        answer.trim();
        answer += `Large: ${element.size?.large?.price?.value} ${element.size?.large?.price?.currency}, ${element.size.large?.weight}\n`;
        answer.trim();
        answer += element.image?.url ? element.image.url : "";
        bot.sendMessage(proxy.getId(), answer);
        answer = "";
    });
});

bot.onText(/\/drinks/, function (msg) {
    let drinks = drinkStorage.getItems();
    let answer = "";
    Array.from(drinks).forEach((element) => {
        answer += `${element.name}\n`;
        answer.trim();
        answer += `Sizes:\n`;
        answer.trim();
        answer += `Default: ${element.size?.default?.price?.value} ${element.size?.default?.price?.currency}, ${element.size.default?.weight}\n`;
        answer.trim();
        answer += `Medium: ${element.size?.medium?.price?.value} ${element.size?.medium?.price?.currency}, ${element.size.medium?.weight}\n`;
        answer.trim();
        answer += `Large: ${element.size?.large?.price?.value} ${element.size?.large?.price?.currency}, ${element.size.large?.weight}\n`;
        answer.trim();
        answer += element.image?.url ? element.image.url : "";
        bot.sendMessage(proxy.getId(), answer);
        answer = "";
    });
});

bot.onText(/\/add "(.+)" (.+)/, function(msg, match) {
    let arg = match? match[1] : "";
    let size = match ? match[2] : "";
    if(arg) {
            let result = ProductIdentifier.identify(arg);
            if(result) {
                if(size) {
                    let sizes = result?.size;
                    switch(size.toLowerCase()) {
                        case "medium" : {
                            let curr_size = {
                                price: {
                                    value: sizes?.medium?.price?.value,
                                    currency: sizes?.medium?.price?.currency
                                },
                                weight: sizes?.medium?.weight
                            }
                            result.size = curr_size;
                        };
                        case "large" : {
                            let curr_size = {
                                price: {
                                    value: sizes?.large?.price?.value,
                                    currency: sizes?.large?.price?.currency
                                },
                                weight: sizes?.large?.weight
                            }
                            result.size = curr_size;
                        };
                        default : {
                            let curr_size = {
                                price: {
                                    value: sizes?.default?.price?.value,
                                    currency: sizes?.default?.price?.currency
                                },
                                weight: sizes?.default?.weight
                            }
                            result.size = curr_size;
                        };
                    }
                }
                proxy.addItem(result);
                bot.sendMessage(proxy.getId(), "Item has been added, thank you for choice");
            }
            else {
                bot.sendMessage(proxy.getId(), "You entered invalid product name");
            }
    }
    else {
        bot.sendMessage(proxy.getId(), "Sorry, you cannot order this item anymore")
    }
})

bot.onText(/\/delete "(.+)"/, function(msg, match) {
    let arg = match? match[1] : "";

    let status = proxy.deleteItem(arg);
    if(status === true) {
        bot.sendMessage(proxy.getId(), "Item has been deleted");
    }
    else {
        bot.sendMessage(proxy.getId(), "You have not this item or you bucket is empty");
    }
})

bot.onText(/\/bucket/, function(msg) {
    let bucket = proxy.getBucket();
    let answer = "";
    let total = 0;
    let currency = "";

    if(bucket.length > 0) {
        Array.from(bucket).forEach((element) => {
            answer += `${element.name}\n`;
            answer.trim();
            answer += `Chosen: ${element.size?.weight ? element.size?.weight : element.size?.capacity}, ${element.size?.price?.value} ${element.size?.price?.currency}\n`;
            answer.trim();
            bot.sendMessage(proxy.getId(), answer);
            answer = "";
            total += element.size?.price?.value;
            currency = element.size?.price?.currency;
        });
        bot.sendMessage(proxy.getId(), `Total price: ${total}${currency}`);
    }
    else {
        bot.sendMessage(proxy.getId(), 'Your bucket is empty');
    }
});

bot.onText(/\/order "(.+)" (.+)/, function(msg, match) {
    let fromId = msg.from?.id;
    let address = match? match[1] : "";
    let payment = match? match[2] : "";
    let prepare = proxy.makeOrder(address);
    if(typeof(prepare) === "string") {
        bot.sendMessage(fromId ? fromId: 0, prepare);
    }
    else {
        if(payment.toLowerCase() === "cash"){
            prepare.setStrategy(cashPayStrategy);
        }
        else if(payment.toLowerCase() === "card") {
            prepare.setStrategy(cardPayStrategy);
        }
        else {
            bot.sendMessage(fromId ? fromId : 0, "Invalid type of payment");
            return;
        }
        let answer = deliveryService.handleOrder(prepare);
        bot.sendMessage(fromId ? fromId : 0, answer ? answer : "kek");
    }
});




