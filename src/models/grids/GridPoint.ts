// Represents a single point in the grid
export class GridPoint {
  public shapeId: string | null = null;
  public adjacentPoints: GridPoint[] = [];

  constructor(public row: number, public column: number, public value: '0' | '1') {}

  // Custom JSON representation of the point
  toJSON() {
    return {
      [`Shape: ${(this.shapeId ?? 'null').padEnd(7)} (${this.row}, ${this.column})`]: this.value,
    };
  }
}
