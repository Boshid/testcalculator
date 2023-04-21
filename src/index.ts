import { Division, Multiply, Sub, Sum } from "./strategies";
import { CalculationHandler } from "./handler";
import { DTO } from "./dto";


const getRandomNumber = (): number => {
    return Math.ceil(Math.abs(Math.random() * 100));
}

function main() {
    const calculation = new CalculationHandler([new Sub(), new Division(), new Sum(), new Multiply()]);

    const context = new DTO(
        getRandomNumber(),
        getRandomNumber(),
    );

    calculation.handle(context);

}

main();
