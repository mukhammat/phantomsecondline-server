export class HttpError extends Error {
    public status: number;

    constructor(message: string, status: number, code?:number) {
        super(message);
        this.status = status;
    }
}
