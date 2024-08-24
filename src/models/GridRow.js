"use strict";
// Represents a row in the grid
class GridRow {
    constructor(rowNumber, rowString) {
        this.rowNumber = rowNumber;
        // Convert string to array of GridPoints, filtering out invalid characters
        this.points = [...rowString]
            .filter(char => char === '0' || char === '1')
            .map((char, index) => new GridPoint(rowNumber, index, char));
    }
    // Custom JSON representation of the row
    toJSON() {
        return this.points.map(point => Object.entries(point.toJSON())[0].join(': ')).join('; ');
    }
}
