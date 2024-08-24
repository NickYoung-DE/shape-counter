"use strict";
// Represents a single point in the grid
class GridPoint {
    constructor(row, column, value) {
        this.row = row;
        this.column = column;
        this.value = value;
        this.shapeId = null;
        this.adjacentPoints = [];
    }
    // Custom JSON representation of the point
    toJSON() {
        return {
            [`Shape: ${(this.shapeId ?? 'null').padEnd(7)} (${this.row}, ${this.column})`]: this.value,
        };
    }
}
