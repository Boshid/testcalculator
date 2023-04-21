import {formatSuccessfulResultLog, formatStrategiesString, formatFailedResultLog} from "./utils/utils";
import { Logger } from "./logger/logger";
import { DTO } from "./dto";
import { CalculationStrategy } from "./strategies";


interface HandlerInterface {
    handle(context: DTO): void;
}

export class CalculationHandler implements HandlerInterface {
    private iterationCount: number = 0;

    private readonly calculations: CalculationStrategy[][] = [];

    constructor(
        private logger: Logger,
        strategies: CalculationStrategy[],
    ) {
        this.permuteCalculations(strategies);
    }

    private permuteCalculations(arr: CalculationStrategy[], m: CalculationStrategy[] = []): void {
            if (arr.length === 0) {
                this.calculations.push(m);
                return;
            }

            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                this.permuteCalculations(curr.slice(), m.concat(next));
            }
        }

    public handle(context: DTO): void {
        this.logger.log("Лог выполнения:");

        for (const calculationVariant of this.calculations) {
            this.logger.log("Текущий результат:", context.total);

            if (this.isCalculationVariantSuccessful(context, calculationVariant)) {
                this.showResult(formatSuccessfulResultLog(context, this.iterationCount, calculationVariant, this.logger.combinationLog));
                return;
            }
        }

        this.showResult(formatFailedResultLog(context, this.iterationCount, this.logger.combinationLog));
    }

    private isCalculationVariantSuccessful(context: DTO, calculationVariant: CalculationStrategy[]): boolean {
        for (const calculation of calculationVariant) {
            const resultTotal = calculation.execute(context);

            this.logger.log(`Выполнено действие: ${calculation.name}. Результат: ${resultTotal}`);

            if (context.total === resultTotal) {
                this.prepareNextCalculation(calculationVariant);
                return false;
            }

            context.total = resultTotal;
        }

        return true;
    }

    private prepareNextCalculation(calculation: CalculationStrategy[]): void {
        ++this.iterationCount;

        this.logger.flushCurrentLog();
        this.logger.logCombination(formatStrategiesString(calculation));
    }

    private showResult(resultLog: string): void {
        console.log(resultLog);
    }
}
