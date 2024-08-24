import { promises as fs } from 'fs';
import { GridRow } from './GridRow.ts';
import { GridError } from './GridError.ts';
import { StandardGridOptions } from './GridOptions/StandardGridOptions.ts';
import { GridPoint } from './GridPoint.ts';
import { IGridOptions } from './GridOptions/IGridOptions.ts';

// Main Grid class
export class Grid implements Iterable<GridRow> {
    private options: IGridOptions;
    rows: GridRow[];
    shapeCounter = 0;
  
    constructor(gridString: string, options?: IGridOptions) {
      if (!gridString.trim()) {
        throw new GridError("Grid string cannot be empty");
      }

      // Set default options if not provided
      this.options = options ? options : new StandardGridOptions();

      // Convert input string to GridRows
      this.rows = gridString.split('\n').map((rowString, index) => new GridRow(index, rowString));

      // Evaluate adjacent ones during instantiation
      this._assignShapeIdsAndAdjacentPoints();
    }
  
    // Evaluate and assign shape IDs to connected '1's
    private _assignShapeIdsAndAdjacentPoints(): void {
      this.rows.forEach((row, i) => {
        row.points.forEach((point, j) => {
          if (point.value === '1' && !point.shapeId) {
            point.adjacentPoints = this._findAdjacentPoints(i, j);
            point.shapeId = this._findExistingShapeId(point, new Set()) || this._assignShapeId(point);
          }
        });
      });
    }
  
    // Recursively find an existing shape ID for connected points
    private _findExistingShapeId(point: GridPoint, visited: Set<GridPoint>): string | null {
      if (point.shapeId) return point.shapeId;
      visited.add(point);
      for (const adjacentPoint of point.adjacentPoints) {
        if (!visited.has(adjacentPoint)) {
          adjacentPoint.adjacentPoints = this._findAdjacentPoints(adjacentPoint.row, adjacentPoint.column);
          const shapeId = this._findExistingShapeId(adjacentPoint, visited);
          if (shapeId) return shapeId;
        }
      }
      return null;
    }
  
    // Check and return adjacent '1' points
    private _findAdjacentPoints(row: number, col: number): GridPoint[] {
      if (row < 0 || row >= this.rows.length || col < 0 || col >= this.rows[0].points.length) {
        throw new GridError(`Invalid coordinates: (${row}, ${col})`);
      }
      
      // Use the provided directions to find adjacent points
      return this.options.directions
        .map(([dx, dy]) => this.rows[row + dx]?.points[col + dy])
        .filter((point): point is GridPoint => point?.value === '1');
    }
  
    // Assign a new shape ID to a point and its connected points
    private _assignShapeId(point: GridPoint): string {
      const shapeId = `${this.options.shapeIdPrefix}${++this.shapeCounter}`;
      const queue = [point];
      while (queue.length) {
        const currentPoint = queue.shift()!;
        if (!currentPoint.shapeId) {
          currentPoint.shapeId = shapeId;
          queue.push(...currentPoint.adjacentPoints.filter(p => !p.shapeId));
        }
      }
      return shapeId;
    }
    
    // Custom JSON representation of the grid
    toJSON() {
      return {
        shapeCounter: this.shapeCounter,
        rows: this.rows.map(row => row.toJSON())
      };
    }
  
    // Convert grid to a 2D array of '0's and '1's
    to2DArray(): ('0' | '1')[][] {
      return this.rows.map(row => row.points.map(point => point.value));
    }
  
    // Make Grid iterable
    *[Symbol.iterator](): Iterator<GridRow> {
      yield* this.rows;
    }
  
    // Static method to create a Grid from a file
    static async fromFile(filename: string, options?: IGridOptions): Promise<Grid> {
      const contents = await fs.readFile(filename, 'utf-8');
      return new Grid(contents, options);
    }
  }
