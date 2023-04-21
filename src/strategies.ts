import { DTO } from "./dto";


export abstract class CalculationStrategy {
    public abstract readonly name: string;

    public abstract execute(context: DTO): number;
}

export class Sub implements CalculationStrategy {
    public readonly name: string = "вычитание"

    public execute(context: DTO): number {
        const {x, y, total} = context;

        if (total < 1000) {
            return  x - y;
        }

        return total;
    }
}

export class Division implements CalculationStrategy {
    public readonly name: string = "деление"
    
    public execute(context: DTO): number {
        const {x, y, total} = context;

        if (total > 1000) {
            return x / y;
        }
        
        return total;
    }
}

export class Sum implements CalculationStrategy {
    public readonly name: string = "сложение"

    public execute(context: DTO): number {
        const {x, y, total} = context;

        if (total >= 0) {
            return  x + y;
        }
        
        return total;
    }
}

export class Multiply implements CalculationStrategy {
    public readonly name: string = "умножение"

    public execute(context: DTO): number {
        const {x, y, total} = context;

        if (total > 10) {
            return x * y;
        }
        
        return total;
    }
}
