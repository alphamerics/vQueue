export default class Table {
    constructor(title) {
        this.padding = 10;
        this.dashPadding = 4;
        this.categories = [];
        this.rows = [];
        this.title = title;
    }
    setTitle(title) {
        this.title = title;
    }
    setPadding(padding) {
        this.padding = padding;
    }
    setDashPadding(dashPadding) {
        this.dashPadding = dashPadding;
    }
    setCategories(categories) {
        this.categories = categories;
    }
    addRow(row) {
        if (row.length > this.categories.length)
            throw new Error("Row count exceeds maximum values");
        this.rows.push(row);
    }
    serializePadding(amount) {
        let collection = "";
        let index = amount;
        while (index > 0) {
            if (index === 0.5)
                collection += " ";
            else
                collection += " ";
            index--;
        }
        return collection;
    }
    serializeDashes(amount) {
        let collection = "";
        let index = amount;
        while (index > 0) {
            collection += "-";
            index--;
        }
        return collection;
    }
    buildCategory() {
        const padding = this.serializePadding(this.padding / 2);
        let collection = "";
        for (let i = 0; i < this.categories.length; i++) {
            collection += padding + this.categories[i] + padding;
        }
        return collection;
    }
    buildTitle() {
        const width = this.buildCategory().length;
        let padding = this.serializePadding(((width - this.title.length) / 2));
        return padding + this.title;
    }
    buildSeperator() {
        let collection = [];
        for (let category of this.categories) {
            let totalWidth = this.padding + category.length;
            let line = this.serializeDashes(totalWidth - this.dashPadding);
            collection.push(line);
        }
        const padding = this.serializePadding(this.dashPadding);
        const offset = this.serializePadding(this.dashPadding / 2);
        return offset + collection.join(padding);
    }
    toString() {
        return [
            this.buildTitle(),
            this.buildCategory(),
            this.buildSeperator(),
        ].join("\n");
    }
}
