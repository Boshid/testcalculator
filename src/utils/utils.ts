import { CalculationStrategy } from "../strategies";
import { DTO } from "../dto";


export const formatStrategiesString = (calculation: CalculationStrategy[]): string => {
    return calculation.map(s => s.name).toString();
}

export const formatSuccessfulResultLog = (
    context: DTO,
    iterationCount: number,
    calculation: CalculationStrategy[],
    combinationLog: string
) => {
    return `Найдена удачная комбинация:
            Число 1 - ${context.x}
            Число 2 - ${context.y}
            Последовательность действий:
            ${formatStrategiesString(calculation)}
            Выполнено итераций: ${iterationCount}
            ${combinationLog}`;
}

export const formatFailedResultLog = (
    context: DTO,
    iterationCount: number,
    combinationLog: string
) => {
    return `Не удалось найти удачную комбинацию:
            Число 1 - ${context.x}
            Число 2 - ${context.y}
            Выполнено итераций: ${iterationCount}
            ${combinationLog}`;
}

export const getRandomNumber = (): number => {
    return Math.ceil(Math.abs(Math.random() * 100));
}
