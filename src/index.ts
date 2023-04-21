import { getRandomNumber } from "./utils/utils";
import { Logger } from "./logger/logger";
import { DTO } from "./dto";
import { Division, Multiply, Sub, Sum } from "./strategies";
import { CalculationHandler } from "./handler";


function main() {
    const calculation = new CalculationHandler(
        new Logger(),
        [ new Sub(), new Division(), new Sum(), new Multiply() ]
    );

    const context = new DTO(
        getRandomNumber(),
        getRandomNumber(),
    );

    calculation.handle(context);

}

main();
