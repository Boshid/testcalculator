export class DTO {
    public total: number;

    constructor(
        readonly x: number,
        readonly y: number,
    ) {
        this.total = 0;
    }
}
