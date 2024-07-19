export default class Table {
    title: string;
    padding: number = 20;
    dashPadding: number = 4;
    categories: string[] = [];
    rows: string[][] = [];

    constructor(title: string) {
        this.title = title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setPadding(padding: number): void {
        this.padding = padding;
    }

    public setDashPadding(dashPadding: number): void {
        this.dashPadding = dashPadding;
    }

    public setCategories(categories: string[]): void {
        this.categories = categories;
    }

    public addRow(row: any[]): void {
        if (row.length > this.categories.length) throw new Error("Row count exceeds maximum values");

        this.rows.push(row);
    }

    private serializePadding(amount: number): string {
        let collection: string = "";

        let index: number = amount;
        while (index > 0) {
            if (index === 0.5) collection += " ";
            else collection += " ";

            index--;
        }

        return collection;
    }

    private serializeDashes(amount: number): string {
        let collection: string = "";

        let index: number = amount;
        while (index > 0) {
            collection += "-";

            index--;
        }

        return collection;
    }

    private buildCategory(): string {
        const padding: string = this.serializePadding(this.padding / 2);
        let collection: string = "";

        for (let category of this.categories) {
            collection += padding + category + padding;
        }

        return collection;
    }

    private buildTitle(): string {
        const width: number = this.buildCategory().replace(/\u001b[^m]*?m/g,"").length;
        const titleLength: number = this.title.replace(/\u001b[^m]*?m/g,"").length; //REMOVE ANSI COLOR CODES TO PREVENT SHIFTING

        let padding: string = this.serializePadding(((width - titleLength) / 2));

        return padding + this.title;
    }

    private buildSeperator(): string {
        let collection: string[] = [];

        for (let category of this.categories) {
            let totalWidth: number = this.padding + category.replace(/\u001b[^m]*?m/g,"").length; // FILTER OUT ALL ANSI CODES TO PREVENT SHIFTING
            let line: string = this.serializeDashes(totalWidth - this.dashPadding);

            collection.push(line);
        }

        const padding: string = this.serializePadding(this.dashPadding);
        const offset: string = this.serializePadding(this.dashPadding / 2);

        return offset + collection.join(padding);
    }

    private buildRow(row: any[]): string {
        let collection: string = "";

        for (let i = 0; i < row.length; i++) {
            let element: any = row[i];
            let category: string = this.categories[i];
            let categoryWidth: number = this.padding + category.replace(/\u001b[^m]*?m/g,"").length;
            const padding: number = ((categoryWidth - element.length) / 2)
            
            collection += this.serializePadding(padding) + element + this.serializePadding(padding)
        }

        return collection;
    }

    toString(): string {
        let serializedRow: string = "";
        for (let row of this.rows) {
            serializedRow += this.buildRow(row) + "\n";
        }

        return [
            this.buildTitle(),
            this.buildCategory(),
            this.buildSeperator(),
            serializedRow,
        ].join("\n");
    }
}