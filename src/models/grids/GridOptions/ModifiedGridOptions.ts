import { IGridOptions } from './IGridOptions';

export class ModifiedGridOptions implements IGridOptions {
  directions: number[][] = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  shapeIdPrefix: string = 'S';
}