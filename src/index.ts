import { Grid } from './models/grids/Grid.ts';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { IGridOptions } from './models/grids/GridOptions/IGridOptions.ts';
import { StandardGridOptions } from './models/grids/GridOptions/StandardGridOptions.ts';
import { ModifiedGridOptions } from './models/grids/GridOptions/ModifiedGridOptions.ts';

const argv = yargs(hideBin(process.argv))
  .option('filename', {
    alias: 'f',
    description: 'The filename to process',
    type: 'string',
  })
  .option('output', {
    alias: 'o',
    description: 'The desired output. Options are: "count", "grid", or "all"',
    type: 'string',
  })
  .option('executionMode', {
    alias: 'e',
    description: 'The execution mode. Options are: "standard" or "modified"',
    type: 'string',
  })
  .parseSync();
const filename = argv.filename || 'example.txt';
const output = argv.output || 'count';
const executionMode = argv.executionMode || 'standard';

// Main function to process the file and log results
export async function main(): Promise<string> {
  try {
    const options: IGridOptions = executionMode === 'standard' ?
      new StandardGridOptions() :
      new ModifiedGridOptions();
    
    // Load the grid
    const grid = await Grid.fromFile(filename, options);
    
    // Output the results
    if (['count','all'].includes(output))
      console.log(`Number of unique shapes: ${grid.shapeCounter}`);
    if (['grid','all'].includes(output))
      console.log('Grid structure:', JSON.stringify(grid, null, 2));
    return 'File processed successfully!';
  } catch (error) {
    console.error(`Error processing file ${filename}:`, error);
    return 'Error processing file!';
  } 
}

main();