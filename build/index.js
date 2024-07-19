import Queue from "./components/Queue";
import Item from "./components/Item";
import chalk from "chalk";
console.log(Object.getOwnPropertyNames(chalk));
const firstQueue = new Queue("First Queue", "hello descripotuion qyeye");
const log = () => {
    console.log("Why hello there!");
};
const hello = new Item("logger", 0, log, "hi", firstQueue);
// hello.execute();
hello.callback();
// console.log(firstQueue.list)
// console.log(firstQueue.findOne({ name: "logger"}));
// //firstQueue.remove({ name: "logger"});
// console.log(firstQueue.findOne({ name: "logger"}));
console.log(firstQueue.toString());
