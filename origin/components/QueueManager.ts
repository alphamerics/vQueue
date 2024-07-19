import Queue from "./Queue";

let queues: Queue[] = [];

export default class QueueManager {
    public QueueManager() {

    }

    establish(max: number, name: string, description?: string) {
        queues.push(new Queue(max, name, description));
    }

    remove(criteria: { name?: string, queue?: Queue }): void {
        for (let queue of queues) {
            if ((criteria.name === undefined || criteria.name === queue.name) &&
                (criteria.queue === undefined || criteria.queue === queue)) {
                
                queues.splice(queues.indexOf(queue), 1);
            }
        }
    }

    findMany(criteria: { name?: string; description?: string; }): Queue[] {
        let collection: Queue[] = [];

        for (let queue of queues) {
            if ((criteria.name === undefined || criteria.name === queue.name) &&
                (criteria.description === undefined || criteria.description === queue.description)) {
                collection.push(queue);
            }
        }

        return collection;
    }

    findOne(criteria: { name?: string; description?: string; }) {
        for (let queue of queues) {
            if ((criteria.name === undefined || criteria.name === queue.name) &&
                (criteria.description === undefined || criteria.description === queue.description)) {
                return queue;
            }
        }

        return null;
    }
}