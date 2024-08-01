import Queue from "./Queue";

export default class QueueManager {
    static queues: Queue[] = [];

    public QueueManager() {

    }

    static establish(max: number, name: string, description?: string): Queue {
        const newQueue: Queue = new Queue(max, name, description);
        this.queues.push(newQueue);

        return newQueue;
    }

    static remove(criteria: { name?: string, queue?: Queue }): void {
        for (let queue of this.queues) {
            if ((criteria.name === undefined || criteria.name === queue.name) &&
                (criteria.queue === undefined || criteria.queue === queue)) {
                
                this.queues.splice(this.queues.indexOf(queue), 1);
            }
        }
    }

    static findMany(criteria: { name?: string; description?: string; }): Queue[] {
        let collection: Queue[] = [];

        for (let queue of this.queues) {
            if ((criteria.name === undefined || criteria.name === queue.name) &&
                (criteria.description === undefined || criteria.description === queue.description)) {
                collection.push(queue);
            }
        }

        return collection;
    }

    static findOne(criteria: { name?: string; description?: string; }) {
        for (let queue of this.queues) {
            if ((criteria.name === undefined || criteria.name === queue.name) &&
                (criteria.description === undefined || criteria.description === queue.description)) {
                return queue;
            }
        }

        return null;
    }
}