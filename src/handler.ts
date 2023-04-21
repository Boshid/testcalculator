import { DTO } from "./dto";
import { CalculationStrategy } from "./strategies";


interface HandlerInterface {
    handle(context: DTO): void;
}

export class CalculationHandler implements HandlerInterface {
    private currentLog: string = "";
    private combinationLog: string;
    private iterationNumber: number = 0;

    private readonly calculations: CalculationStrategy[][] = [];

    constructor(
        strategies: CalculationStrategy[],
    ) {
        this.combinationLog = "Неудачные комбинации:\n";
        this.permuteCalculations(strategies);
    }

    private getStrategiesString(calculation: CalculationStrategy[]): string {
        return calculation.map(s => s.name).toString();
    }

    private permuteCalculations(arr: CalculationStrategy[], m: CalculationStrategy[] = []) {
            if (arr.length === 0) {
                this.calculations.push(m);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    this.permuteCalculations(curr.slice(), m.concat(next));
                }
            }
        }

    public handle(context: DTO): void {
        this.log("Лог выполнения:");

        for (const calculationVariant of this.calculations) {
            this.log("Текущий результат:", context.total);

            if (this.isCalculationVariantSuccessful(context, calculationVariant)) {
                this.showResultLog(context, calculationVariant);
                break;
            }
        }
    }

    private isCalculationVariantSuccessful(context: DTO, calculationVariant: CalculationStrategy[]): boolean {
        for (const calculation of calculationVariant) {
            const resultTotal = calculation.execute(context);

            this.log(`Выполнено действие: ${calculation.name}. Результат: ${resultTotal}`);

            if (context.total === resultTotal) {
                this.prepareNextCalculation(calculationVariant);
                return false;
            }

            context.total = resultTotal;
        }

        return true;
    }

    private showResultLog(context: DTO, calculation: CalculationStrategy[]): void {
        const resultLog = `
            Найдена удачная комбинация:
            Число 1 - ${context.x}
            Число 2 - ${context.y}
            Последовательность действий:
            ${this.getStrategiesString(calculation)}
            Выполнено итераций: ${this.iterationNumber}
        `;

        console.log(resultLog, this.currentLog, this.combinationLog);
    }

    private log(message: string, context: any = ''): void {
        this.currentLog += `${message} ${context}\n`;
    }

    private prepareNextCalculation(calculation: CalculationStrategy[]): void {
        ++this.iterationNumber;

        this.currentLog = "";
        this.combinationLog += `${this.getStrategiesString(calculation)}\n`;
    }
}
