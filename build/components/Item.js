export default class Item {
    constructor(name, weight, callback, description, queue) {
        if (weight < 0)
            throw new Error("Weight cannot be negative.");
        this.name = name;
        this.weight = weight;
        this.callback = callback;
        this.description = description;
        this.queue = queue;
        if (queue != null)
            queue.list.push(this);
    }
    execute() {
        this.callback();
    }
    enqueue(queue) {
        queue.list.push(this);
    }
}
