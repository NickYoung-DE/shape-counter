import { GridPoint } from './GridPoint.ts';

// Represents a row in the grid
export class GridRow {
  points: GridPoint[];

  constructor(public rowNumber: number, rowString: string) {
    // Convert string to array of GridPoints, filtering out invalid characters
    this.points = [...rowString]
      .filter(char => char === '0' || char === '1')
      .map((char, index) => new GridPoint(rowNumber, index, char as '0' | '1'));
  }

  // Custom JSON representation of the row
  toJSON() {
    return this.points.map(point => Object.entries(point.toJSON())[0].join(': ')).join('; ');
  }
}