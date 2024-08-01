import QueueManager from "./components/QueueManager";
import Queue from "./components/Queue";
import Item from "./components/Item";

const firstQueue: Queue = QueueManager.establish(2, "First Queue", "This is the first Queue"); // Creates the queue

// You can also find queues later with their details.
QueueManager.establish(1, "Second Queue", "This is a second queue description");
const secondQueue: Queue | null = QueueManager.findOne({ name: "Second Queue", description: "This is a second queue description" });
secondQueue?.add(new Item("Test item", 0, console.log("Example of second queue")));

function exampleFunction() {
    console.log("Items can also take callbacks");
}

// Functions getting sent to the queue by weight
firstQueue.add(new Item("First Item", 0, console.log("Items can take voids")));
firstQueue.add(new Item("Second Item", 1, exampleFunction()));

console.log(firstQueue.toString());
console.log(secondQueue?.toString());

setTimeout(() => {
    console.log(firstQueue.toString());
    console.log(secondQueue?.toString());
}, 5000);