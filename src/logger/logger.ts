export class Logger {
    private currentLog: string = "";
    public combinationLog: string;

    constructor() {
        this.combinationLog = "Неудачные комбинации:\n";
    }

    public log(message: string, context: any = ''): void {
        this.currentLog += `${message} ${context}\n`;
    }

    public flushCurrentLog(): void {
        this.currentLog = "";
    }

    public logCombination(context: any): void {
        this.combinationLog += `${context}\n`;
    }
}
