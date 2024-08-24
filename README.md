# Shape Counter

This is a simple project that counts the number of unique shapes in a grid of characters. The grid is represented as a 2D array of '0's and '1's, where '1' represents a point and '0' represents an empty space. A shape is a group of connected '1's.

## How to Execute the Script

To execute the script, run the following command in your terminal:

```
node src/index.js --filename <path_to_your_file> --output <desired_output> --executionMode <execution_mode>
```

Replace `<path_to_your_file>` with the path to your grid file, `<desired_output>` with the desired output (options are: "count", "grid", or "all"), and `<execution_mode>` with the execution mode (options are: "standard" or "modified").

## Optional Parameters

- `--filename` or `-f`: The filename of the grid file to process. If not provided, it defaults to 'example.txt'.
- `--output` or `-o`: The desired output. Options are: "count", "grid", or "all". If not provided, it defaults to 'count'.
- `--executionMode` or `-e`: The execution mode. Options are: "standard" or "modified". If not provided, it defaults to 'standard'.

## Output Formats

### Count Output

The count output simply displays the number of unique shapes found in the grid.

Example:
```
Number of unique shapes: 3
```

### Grid Output

The grid output displays the grid structure with each shape assigned a unique ID. The grid is represented as a 2D array of objects, where each object contains the point's value ('0' or '1') and its shape ID (if it's part of a shape).

Example:

Let's say we have a grid file `example.txt` with the following contents:
```
001010
011011
001000
001001
000000
000000
```
Running the command:
```bash
node src/index.js --filename example.txt --output grid
```
Would generate the following output:
```
Grid structure: {
  "shapeCounter": 3,
  "rows": [
    "Shape: null    (0, 0): 0; Shape: null    (0, 1): 0; Shape: S1      (0, 2): 1; Shape: null    (0, 3): 0; Shape: S2      (0, 4): 1; Shape: null    (0, 5): 0",
    "Shape: null    (1, 0): 0; Shape: S1      (1, 1): 1; Shape: S1      (1, 2): 1; Shape: null    (1, 3): 0; Shape: S2      (1, 4): 1; Shape: S2      (1, 5): 1",
    "Shape: null    (2, 0): 0; Shape: null    (2, 1): 0; Shape: S1      (2, 2): 1; Shape: null    (2, 3): 0; Shape: null    (2, 4): 0; Shape: null    (2, 5): 0",
    "Shape: null    (3, 0): 0; Shape: null    (3, 1): 0; Shape: S1      (3, 2): 1; Shape: null    (3, 3): 0; Shape: null    (3, 4): 0; Shape: S3      (3, 5): 1",
    "Shape: null    (4, 0): 0; Shape: null    (4, 1): 0; Shape: null    (4, 2): 0; Shape: null    (4, 3): 0; Shape: null    (4, 4): 0; Shape: null    (4, 5): 0",
    "Shape: null    (5, 0): 0; Shape: null    (5, 1): 0; Shape: null    (5, 2): 0; Shape: null    (5, 3): 0; Shape: null    (5, 4): 0; Shape: null    (5, 5): 0"
  ]
}
```
In this example, the grid output shows two shapes: "shape1" which consists of four connected '1's, and "shape2" which consists of a single '1'.

### All Output

The all output displays both the count and grid outputs.


