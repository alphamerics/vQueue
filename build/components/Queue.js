import Table from "../Attributes/Table";
const AsciiTable = require('ascii-table');
export default class Queue {
    constructor(name, description) {
        this.list = [];
        this.name = name;
        this.description = description;
    }
    findMany(criteria) {
        let collection = [];
        for (let item of this.list) {
            if ((criteria.name === undefined || criteria.name === item.name) &&
                (criteria.description === undefined || criteria.description === item.description) &&
                (criteria.weight === undefined || criteria.weight === item.weight)) {
                collection.push(item);
            }
        }
        return collection;
    }
    findOne(criteria) {
        for (let item of this.list) {
            if ((criteria.name === undefined || criteria.name === item.name) &&
                (criteria.description === undefined || criteria.description === item.description) &&
                (criteria.weight === undefined || criteria.weight === item.weight)) {
                return item;
            }
        }
        return null;
    }
    add(item) {
        this.list[item.weight] = item;
    }
    remove(criteria) {
        for (let item of this.list) {
            if ((criteria.name === undefined || criteria.name === item.name) &&
                (criteria.weight === undefined || criteria.weight === item.weight) &&
                (criteria.item === undefined || criteria.item === item)) {
                this.list.splice(this.list.indexOf(item), 1);
            }
        }
    }
    toString() {
        let table = new Table(this.name);
        table.setCategories(["Weight", "Name", "Status"]);
        // console.log(chalk.green("HELLO"))
        return table.toString();
    }
}
