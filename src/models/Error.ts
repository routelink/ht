export class Error {
    message!: string;
    status!: number;
    stack!: string;


    constructor(message: string, status: number = 500, stack: string = '') {
        this.message = message;
        this.status = status;
        this.stack = stack;
    }
}