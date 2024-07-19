import Item from "./Item";
import Table from "../Attributes/Table";
import chalk from "chalk";

type QueueTemplate = {
    max: number,
    name: string,
    description?: string,
}

export default class Queue implements QueueTemplate {
    max: number;
    name: string;
    description?: string;
    list: Item[] = [];

    constructor(max: number, name: string, description?: string) {
        this.max = max;
        this.name = name;
        this.description = description;
    }

    /**
     * Finds and returns a collection of items that match the given criteria.
     * 
     * @param {Object} criteria - An object specifying the criteria to match items against.
     * @param {string} [criteria.name] - The name of the item to match. If undefined, the name is ignored in the matching.
     * @param {string} [criteria.description] - The description of the item to match. If undefined, the description is ignored in the matching.
     * @param {number} [criteria.weight] - The weight of the item to match. If undefined, the weight is ignored in the matching.
     * @returns {Item[]} - An array of items that match the specified criteria.
     */
    findMany(criteria: { name?: string; description?: string; weight?: number; }): Item[] {
        let collection: Item[] = [];

        for (let item of this.list) {
            if ((criteria.name === undefined || criteria.name === item.name) &&
                (criteria.description === undefined || criteria.description === item.description) &&
                (criteria.weight === undefined || criteria.weight === item.weight)) {
                collection.push(item);
            }
        }

        return collection;
    }

    /**
     * Finds and returns the first item that matches the given criteria.
     * 
     * @param {Object} criteria - An object specifying the criteria to match the item against.
     * @param {string} [criteria.name] - The name of the item to match. If undefined, the name is ignored in the matching.
     * @param {string} [criteria.description] - The description of the item to match. If undefined, the description is ignored in the matching.
     * @param {number} [criteria.weight] - The weight of the item to match. If undefined, the weight is ignored in the matching.
     * @returns {Item | null} - The first item that matches the specified criteria, or `null` if no matching item is found.
     */
    findOne(criteria: { name?: string; description?: string; weight?: number; }) {
        for (let item of this.list) {
            if ((criteria.name === undefined || criteria.name === item.name) &&
                (criteria.description === undefined || criteria.description === item.description) &&
                (criteria.weight === undefined || criteria.weight === item.weight)) {
                return item;
            }
        }

        return null;
    }

    /**
     * Adds a new item to the list and sorts the list by item weight.
     * 
     * @param {Item} item - The item to be added to the list.
     * @returns {void}
     */
    add(item: Item): void {
        this.list.push(item);
        this.list.sort((a, b) => a.weight - b.weight);

        if (this.list.length != this.max) return;

        for (const item of this.list)
            item.execute();
    }

    remove(criteria: { name?: string, weight?: number; item?: Item }): void {
        for (let item of this.list) {
            if ((criteria.name === undefined || criteria.name === item.name) &&
                (criteria.weight === undefined || criteria.weight === item.weight) &&
                (criteria.item === undefined || criteria.item === item)) {
                
                this.list.splice(this.list.indexOf(item), 1);
            }
        }
    }

    /**
     * Removes items from the list that match the given criteria.
     * 
     * @param {Object} criteria - An object specifying the criteria to match items against for removal.
     * @param {string} [criteria.name] - The name of the item to match. If undefined, the name is ignored in the matching.
     * @param {number} [criteria.weight] - The weight of the item to match. If undefined, the weight is ignored in the matching.
     * @param {Item} [criteria.item] - The item instance to match. If undefined, the item instance is ignored in the matching.
     * @returns {void}
     */
    toString(): string {
        let table = new Table(chalk.bold.rgb(181, 200, 255)(this.name))
        table.setCategories([chalk.rgb(135, 146, 255)("Weight"), chalk.rgb(135, 146, 255)("Name"), chalk.rgb(135, 146, 255)("Status"), chalk.rgb(135, 146, 255)("Runtime")]);
        
        for (let item of this.list) {
            table.addRow([item.weight.toString(), item.name, item.state, item.runtime])
        }

        return table.toString();
    }
}