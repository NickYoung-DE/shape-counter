// Custom error class for Grid-related errors
export class GridError extends Error {
    constructor(message) {
        super(message);
        this.name = "GridError";
    }
}
