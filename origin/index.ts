import QueueManager from "./components/QueueManager";
import Queue from "./components/Queue";
import Item from "./components/Item";

const manager: QueueManager = new QueueManager();

manager.establish(2, "First Queue", "This is the first Queue"); // Creates the queue
const firstQueue: Queue | null = manager.findOne({ name: "First Queue" }); // Find the queue based off of the set name



// Functions getting sent to the queue by weight
const secondfunction = new Item("two", 1, () => {
    console.log("This is an example of the queue getting sorted by weight")
}, "This is the description of the itema", firstQueue);

const firstfunction = new Item("one", 0, () => {
    console.log("This is a queued callback")
}, "This is the description of the item", firstQueue);



if (firstQueue !== null) {
    console.log(firstQueue.toString());

    setTimeout(() => {
        console.log(firstQueue!.toString());
    }, 5000);
} else {
    console.log("Queue not found");
}