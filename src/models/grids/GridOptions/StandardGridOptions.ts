import { IGridOptions } from './IGridOptions';

export class StandardGridOptions implements IGridOptions {
    directions: number[][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    shapeIdPrefix: string = 'S';
}