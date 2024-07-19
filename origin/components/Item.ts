import Queue from "./Queue";

function truncateDecimal(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.floor(value * factor) / factor;
}

enum ItemState {
    IDLE = "IDLE",
    EXECUTING = "EXECUTING",
    EXECUTED = "EXECUTED",
    ERROR = "ERROR",
}

interface ItemTemplate {
    name: string,
    description?: string,
    queue?: Queue | null,
    weight: number,
    callback: void | Function,
}

export default class Item implements ItemTemplate {
    name: string;
    weight: number;
    callback: void | Function;
    description?: string;
    queue?: Queue | null;

    state: ItemState = ItemState.IDLE;
    runtime: string = "0ms";
    
    constructor(name: string, weight: number, callback: void | Function, description?: string, queue?: Queue | null) {
        if (weight < 0) throw new Error("Weight cannot be negative.");
        
        this.name = name;
        this.weight = weight
        this.callback = callback;
        this.description = description;
        this.queue = queue;

        if (queue != null) queue.add(this);
    }

    /**
     * Executes the callback function associated with this item and measures the execution time.
     *
     * This method updates the item's state to `EXECUTING`, executes the callback (if it is a function), and measures
     * the time taken for the callback to complete. After execution, it updates the state to `EXECUTED` and resolves
     * the promise. If an error occurs during execution, it updates the state to `ERROR` and rejects the promise with
     * the error.
     * 
     * @returns {Promise<void>} - A promise that resolves when the execution is complete or rejects if an error occurs.
     */
    async execute(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const start = performance.now();
                this.state = ItemState.EXECUTING;
        
                if (typeof this.callback === "function") await this.callback();
                else await this.callback;
        
                const end = performance.now();
        
                this.runtime = truncateDecimal((end - start), 5) + "ms";
                this.state = ItemState.EXECUTED;

                resolve();
            } catch(error) {
                this.state= ItemState.ERROR;
                reject(error);
            }
        })
    }

    enqueue(queue: Queue): void {
        queue.add(this);
    }

    dequeue(queue: Queue): void {
        queue.remove(this);
    }
}